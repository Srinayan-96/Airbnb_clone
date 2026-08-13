from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint, String
from sqlalchemy.orm import relationship
from app.database import Base

class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    listing_id = Column(Integer, ForeignKey("listings.id"))
    created_at = Column(String)

    user = relationship("User", back_populates="wishlists")
    listing = relationship("Listing", back_populates="wishlists")

    __table_args__ = (
        UniqueConstraint('user_id', 'listing_id', name='_user_listing_uc'),
    )
