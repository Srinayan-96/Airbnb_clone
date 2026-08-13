from sqlalchemy import Column, Integer, String, Boolean, Text, Float, Enum, ForeignKey, Numeric
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class ListingStatus(str, enum.Enum):
    draft = "draft"
    published = "published"

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    host_id = Column(Integer, ForeignKey("users.id"))
    
    title = Column(String)
    description = Column(Text)
    property_type = Column(String)
    city = Column(String, index=True)
    state = Column(String)
    country = Column(String)
    address_line = Column(String, nullable=True)
    latitude = Column(Float)
    longitude = Column(Float)
    
    max_guests = Column(Integer)
    bedrooms = Column(Integer)
    beds = Column(Integer)
    bathrooms = Column(Float)
    
    price_per_night = Column(Numeric(10, 2))
    cleaning_fee = Column(Numeric(10, 2), default=0)
    service_fee_percent = Column(Float, default=0.05)
    tax_percent = Column(Float, default=0.12)
    
    cancellation_policy = Column(String)
    house_rules = Column(Text, nullable=True)
    safety_info = Column(Text, nullable=True)
    
    is_guest_favourite = Column(Boolean, default=False)
    status = Column(Enum(ListingStatus), default=ListingStatus.draft)
    
    created_at = Column(String)
    updated_at = Column(String)

    host = relationship("User", back_populates="listings")
    photos = relationship("ListingPhoto", back_populates="listing", cascade="all, delete-orphan")
    bookings = relationship("Booking", back_populates="listing")
    reviews = relationship("Review", back_populates="listing")
    wishlists = relationship("Wishlist", back_populates="listing")
    amenities = relationship("ListingAmenity", back_populates="listing", cascade="all, delete-orphan")

    @property
    def cover_photo_url(self):
        # Return the URL of the first photo (position 0), or any photo if pos 0 is missing
        if self.photos:
            for p in self.photos:
                if p.position == 0:
                    return p.url
            return self.photos[0].url
        return None
