from pydantic import BaseModel
from typing import Optional
from .user import UserRead

class ReviewCreate(BaseModel):
    booking_id: int
    overall_rating: float
    cleanliness: float
    accuracy: float
    checkin: float
    communication: float
    location: float
    value: float
    comment: str

class ReviewRead(BaseModel):
    id: int
    listing_id: int
    booking_id: int
    author: UserRead
    
    overall_rating: float
    cleanliness: float
    accuracy: float
    checkin: float
    communication: float
    location: float
    value: float
    
    comment: str
    created_at: str

    model_config = {"from_attributes": True}
