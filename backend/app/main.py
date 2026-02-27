from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from .database import Base, engine, SessionLocal
from .models import Favorite
from pydantic import BaseModel

Base.metadata.create_all(bind=engine)

app = FastAPI(title="My Favorite API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class FavoriteSchema(BaseModel):
    title: str
    description: str

class FavoriteResponse(FavoriteSchema):
    id: int
    likes: int
    dislikes: int

    class Config:
        from_attributes = True


@app.get("/favorites", response_model=list[FavoriteResponse])
def get_all(
    skip: int = 0,
    limit: int = 10,
    search: str = Query(None),
    sort: str = Query("az"),
    db: Session = Depends(get_db)
):
    query = db.query(Favorite)

    # 🔎 Fast filter
    if search:
        query = query.filter(Favorite.title.ilike(f"%{search}%"))

    # ↕ Sorting
    if sort == "az":
        query = query.order_by(Favorite.title.asc())
    elif sort == "za":
        query = query.order_by(Favorite.title.desc())
    elif sort == "rating":
        query = query.order_by(desc(Favorite.likes - Favorite.dislikes))

    return query.offset(skip).limit(limit).all()


@app.post("/favorites", response_model=FavoriteResponse)
def create(item: FavoriteSchema, db: Session = Depends(get_db)):
    db_item = Favorite(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.post("/favorites/{id}/like")
def like(id: int, db: Session = Depends(get_db)):
    item = db.query(Favorite).get(id)
    item.likes += 1
    db.commit()
    return {"likes": item.likes}


@app.post("/favorites/{id}/dislike")
def dislike(id: int, db: Session = Depends(get_db)):
    item = db.query(Favorite).get(id)
    item.dislikes += 1
    db.commit()
    return {"dislikes": item.dislikes}


@app.put("/favorites/{id}", response_model=FavoriteResponse)
def update(id: int, data: FavoriteSchema, db: Session = Depends(get_db)):
    item = db.query(Favorite).get(id)
    if not item:
        raise HTTPException(404)
    item.title = data.title
    item.description = data.description
    db.commit()
    db.refresh(item)
    return item


@app.delete("/favorites/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    item = db.query(Favorite).get(id)
    if not item:
        raise HTTPException(404)
    db.delete(item)
    db.commit()
    return {"ok": True}
