from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc
from .database import Base, engine, SessionLocal
from .models import Favorite
from pydantic import BaseModel

# создаём таблицы
Base.metadata.create_all(bind=engine)

app = FastAPI(title="My Favorite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev режим
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    search: str | None = Query(None),
    sort: str = "new",
    db: Session = Depends(get_db),
):
    query = db.query(Favorite)

    if search:
        query = query.filter(Favorite.title.ilike(f"%{search}%"))

    if sort == "az":
        query = query.order_by(Favorite.title.asc())

    elif sort == "za":
        query = query.order_by(Favorite.title.desc())

    elif sort == "rating":
        query = query.order_by(desc(Favorite.likes - Favorite.dislikes))

    elif sort == "new":
        query = query.order_by(desc(Favorite.id))  # 🔥 новые сверху

    return query.offset(skip).limit(limit).all()


@app.post("/favorites", response_model=FavoriteResponse)
def create(item: FavoriteSchema, db: Session = Depends(get_db)):
    db_item = Favorite(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.post("/favorites/{id}/like")
def like_favorite(id: int, db: Session = Depends(get_db)):
    item = db.get(Favorite, id)

    if not item:
        raise HTTPException(status_code=404, detail="Not found")

    item.likes += 1
    db.commit()
    db.refresh(item)

    return {
        "id": item.id,
        "likes": item.likes,
        "dislikes": item.dislikes
    }


@app.post("/favorites/{id}/dislike")
def dislike_favorite(id: int, db: Session = Depends(get_db)):
    item = db.get(Favorite, id)

    if not item:
        raise HTTPException(status_code=404, detail="Not found")

    item.dislikes += 1
    db.commit()
    db.refresh(item)

    return {
        "id": item.id,
        "likes": item.likes,
        "dislikes": item.dislikes
    }

@app.delete("/favorites/{favorite_id}")
def delete_favorite(favorite_id: int, db: Session = Depends(get_db)):
    favorite = db.query(Favorite).filter(Favorite.id == favorite_id).first()

    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")

    db.delete(favorite)
    db.commit()

    return {"message": "Favorite deleted successfully"}