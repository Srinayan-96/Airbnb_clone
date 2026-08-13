from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    booking_id = Column(Integer, ForeignKey("bookings.id"), unique=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    
    overall_rating = Column(Float)
    cleanliness = Column(Float)
    accuracy = Column(Float)
    checkin = Column(Float)
    communication = Column(Float)
    location = Column(Float)
    value = Column(Float)
    
    comment = Column(Text)
    created_at = Column(String)

    listing = relationship("Listing", back_populates="reviews")
    booking = relationship("Booking", back_populates="review")
    author = relationship("User", back_populates="reviews")
