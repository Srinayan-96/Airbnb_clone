from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.review import Review
from app.models.booking import Booking, BookingStatus
from app.models.listing import Listing
from app.schemas.review import ReviewCreate, ReviewRead
from app.schemas.listing import RatingAggregate

router = APIRouter()

@router.get("/{listing_id}/reviews", response_model=dict)
def get_listing_reviews(
    listing_id: int,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    query = db.query(Review).filter(Review.listing_id == listing_id)
    total = query.count()
    reviews = query.offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": reviews,
        "total": total,
        "page": page,
        "page_size": page_size,
        "has_more": (page * page_size) < total
    }

@router.post("/{listing_id}/reviews", response_model=ReviewRead)
def create_review(
    listing_id: int,
    review_in: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    booking = db.query(Booking).filter(
        Booking.id == review_in.booking_id,
        Booking.listing_id == listing_id,
        Booking.guest_id == current_user.id,
        Booking.status == BookingStatus.completed
    ).first()
    
    if not booking:
        raise HTTPException(status_code=403, detail="Can only review completed bookings")
        
    existing_review = db.query(Review).filter(Review.booking_id == booking.id).first()
    if existing_review:
        raise HTTPException(status_code=409, detail="already_reviewed")
        
    new_review = Review(
        listing_id=listing_id,
        booking_id=booking.id,
        author_id=current_user.id,
        overall_rating=review_in.overall_rating,
        cleanliness=review_in.cleanliness,
        accuracy=review_in.accuracy,
        checkin=review_in.checkin,
        communication=review_in.communication,
        location=review_in.location,
        value=review_in.value,
        comment=review_in.comment,
        created_at=datetime.utcnow().isoformat()
    )
    
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    
    return new_review
