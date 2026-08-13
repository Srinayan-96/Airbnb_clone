from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Amenity(Base):
    __tablename__ = "amenities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    icon = Column(String)
    
    listing_amenities = relationship("ListingAmenity", back_populates="amenity")

class ListingAmenity(Base):
    __tablename__ = "listing_amenities"
    
    listing_id = Column(Integer, ForeignKey("listings.id"), primary_key=True)
    amenity_id = Column(Integer, ForeignKey("amenities.id"), primary_key=True)

    listing = relationship("Listing", back_populates="amenities")
    amenity = relationship("Amenity", back_populates="listing_amenities")
