from sqlalchemy import Column, Integer, String, Boolean, Text, Enum
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class RoleEnum(str, enum.Enum):
    guest = "guest"
    host = "host"
    both = "both"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    avatar_url = Column(String, nullable=True)
    role = Column(Enum(RoleEnum), default=RoleEnum.guest)
    is_superhost = Column(Boolean, default=False)
    
    bio = Column(Text, nullable=True)
    work = Column(String, nullable=True)
    school = Column(String, nullable=True)
    response_rate = Column(Integer, nullable=True)
    created_at = Column(String) # Storing as ISO string for simplicity or DateTime

    listings = relationship("Listing", back_populates="host")
    bookings = relationship("Booking", back_populates="guest")
    reviews = relationship("Review", back_populates="author")
    wishlists = relationship("Wishlist", back_populates="user")
