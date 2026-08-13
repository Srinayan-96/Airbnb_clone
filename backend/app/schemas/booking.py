from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional
from typing import Optional, ForwardRef
from .listing import ListingCardRead

class BookingCreate(BaseModel):
    listing_id: int
    check_in: date
    check_out: date
    num_guests: int
    message_to_host: Optional[str] = None

class BookingRead(BaseModel):
    id: int
    listing_id: int
    guest_id: int
    check_in: date
    check_out: date
    num_guests: int
    nights: int
    
    nightly_rate_snapshot: Decimal
    subtotal: Decimal
    cleaning_fee: Decimal
    service_fee: Decimal
    taxes: Decimal
    total_price: Decimal
    
    status: str
    message_to_host: Optional[str]
    created_at: str

    is_upcoming: bool = False
    is_past: bool = False

    listing: Optional[ListingCardRead] = None
    
    model_config = {"from_attributes": True}
