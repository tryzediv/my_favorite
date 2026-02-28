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
    sort: str = "az",
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

    return query.offset(skip).limit(limit).all()


@app.post("/favorites", response_model=FavoriteResponse)
def create(item: FavoriteSchema, db: Session = Depends(get_db)):
    db_item = Favorite(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item