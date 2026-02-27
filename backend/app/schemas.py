from pydantic import BaseModel

class FavoriteBase(BaseModel):
    title: str
    description: str

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteUpdate(FavoriteBase):
    pass

class FavoriteResponse(FavoriteBase):
    id: int
    likes: int
    dislikes: int

    class Config:
        from_attributes = True
