from pydantic import BaseModel, condecimal
from typing import List, Optional, Dict
from decimal import Decimal
from .user import UserRead

class AmenityRead(BaseModel):
    id: int
    name: str
    category: str
    icon: str
    
    model_config = {"from_attributes": True}

class ListingPhotoBase(BaseModel):
    url: str
    position: int

class ListingPhotoRead(ListingPhotoBase):
    id: int

    model_config = {"from_attributes": True}

class RatingAggregate(BaseModel):
    overall: float
    cleanliness: float
    accuracy: float
    checkin: float
    communication: float
    location: float
    value: float
    distribution: Dict[str, int]

class ListingBase(BaseModel):
    title: str
    description: str
    property_type: str
    city: str
    state: str
    country: str
    address_line: Optional[str] = None
    latitude: float
    longitude: float
    max_guests: int
    bedrooms: int
    beds: int
    bathrooms: float
    price_per_night: Decimal
    cleaning_fee: Decimal = Decimal('0.00')
    service_fee_percent: float = 0.05
    tax_percent: float = 0.12
    cancellation_policy: str = "flexible"
    house_rules: Optional[str] = None
    safety_info: Optional[str] = None

class ListingCreate(ListingBase):
    amenity_ids: List[int] = []
    photos: List[ListingPhotoBase] = []

class ListingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price_per_night: Optional[Decimal] = None
    status: Optional[str] = None

class ListingCardRead(BaseModel):
    id: int
    title: str
    property_type: str
    city: str
    country: str
    cover_photo_url: Optional[str] = None
    price_per_night: Decimal
    rating: Optional[float] = None
    review_count: int = 0
    is_guest_favourite: bool
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    model_config = {"from_attributes": True}

class Location(BaseModel):
    city: str
    country: str
    latitude: float
    longitude: float

class ListingDetailRead(ListingBase):
    id: int
    host: UserRead
    co_hosts: List[UserRead] = []
    photos: List[ListingPhotoRead] = []
    location: Location
    amenities: List[AmenityRead] = []
    rating: Optional[RatingAggregate] = None
    review_count: int = 0
    is_guest_favourite: bool
    unavailable_dates: List[str] = []
    status: str

    model_config = {"from_attributes": True}
