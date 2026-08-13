from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from datetime import datetime

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.wishlist import Wishlist
from app.models.listing import Listing
from app.schemas.wishlist import WishlistRead

router = APIRouter()

@router.get("", response_model=List[WishlistRead])
def get_wishlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    wishlists = db.query(Wishlist).filter(Wishlist.user_id == current_user.id).all()
    # Mock cover photo and rating for ListingCardRead parsing
    for w in wishlists:
        if w.listing.photos:
            w.listing.cover_photo_url = sorted(w.listing.photos, key=lambda x: x.position)[0].url
        else:
            w.listing.cover_photo_url = None
            
        w.listing.rating = 4.5 # Mocked for speed
        w.listing.review_count = len(w.listing.reviews)
    return wishlists

@router.post("/{listing_id}", response_model=WishlistRead)
def add_to_wishlist(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    try:
        new_item = Wishlist(
            user_id=current_user.id,
            listing_id=listing_id,
            created_at=datetime.utcnow().isoformat()
        )
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
    except IntegrityError:
        db.rollback()
        new_item = db.query(Wishlist).filter(
            Wishlist.user_id == current_user.id, 
            Wishlist.listing_id == listing_id
        ).first()
        
    return new_item

@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_from_wishlist(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.listing_id == listing_id
    ).first()
    
    if item:
        db.delete(item)
        db.commit()
        
    return None
