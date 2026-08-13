from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric, Enum, Text
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class BookingStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"
    completed = "completed"

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    guest_id = Column(Integer, ForeignKey("users.id"))
    
    check_in = Column(Date)
    check_out = Column(Date)
    num_guests = Column(Integer)
    nights = Column(Integer)
    
    nightly_rate_snapshot = Column(Numeric(10, 2))
    subtotal = Column(Numeric(10, 2))
    cleaning_fee = Column(Numeric(10, 2))
    service_fee = Column(Numeric(10, 2))
    taxes = Column(Numeric(10, 2))
    total_price = Column(Numeric(10, 2))
    
    status = Column(Enum(BookingStatus), default=BookingStatus.confirmed)
    message_to_host = Column(Text, nullable=True)
    created_at = Column(String)

    guest = relationship("User", back_populates="bookings")
    listing = relationship("Listing", back_populates="bookings")
    review = relationship("Review", back_populates="booking", uselist=False)
