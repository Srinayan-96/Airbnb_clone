from pydantic import BaseModel
from .listing import ListingCardRead

class WishlistRead(BaseModel):
    id: int
    user_id: int
    listing_id: int
    created_at: str
    
    listing: ListingCardRead

    model_config = {"from_attributes": True}
