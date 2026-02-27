from sqlalchemy import Column, Integer, String
from .database import Base

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(String(255))
    likes = Column(Integer, default=0)
    dislikes = Column(Integer, default=0)