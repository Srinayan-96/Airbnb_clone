from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload, selectinload
from datetime import date, datetime
from typing import List

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.booking import Booking, BookingStatus
from app.models.listing import Listing
from app.schemas.booking import BookingCreate, BookingRead
from app.services.availability_service import has_overlap
from app.services.pricing_service import calculate_price

router = APIRouter()

@router.post("", response_model=BookingRead)
def create_booking(
    booking_in: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. check_out > check_in
    if booking_in.check_out <= booking_in.check_in:
        raise HTTPException(
            status_code=422,
            detail={"detail": "Check-out must be after check-in", "error_code": "invalid_date_range"}
        )
        
    # 2. check_in >= today
    if booking_in.check_in < date.today():
        raise HTTPException(
            status_code=422,
            detail={"detail": "Check-in cannot be in the past", "error_code": "checkin_in_past"}
        )
        
    listing = db.query(Listing).filter(Listing.id == booking_in.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    # 3. num_guests <= listing.max_guests
    if booking_in.num_guests > listing.max_guests:
        raise HTTPException(
            status_code=422,
            detail={"detail": f"Guest count exceeds maximum of {listing.max_guests}", "error_code": "guest_count_exceeded"}
        )
        
    # 4. No overlap
    if has_overlap(db, booking_in.listing_id, booking_in.check_in, booking_in.check_out):
        raise HTTPException(
            status_code=409,
            detail={"detail": "Dates are unavailable", "error_code": "dates_unavailable"}
        )
        
    # 5. Compute price
    nights = (booking_in.check_out - booking_in.check_in).days
    price_breakdown = calculate_price(
        nightly_rate=listing.price_per_night,
        nights=nights,
        cleaning_fee=listing.cleaning_fee,
        service_fee_percent=listing.service_fee_percent,
        tax_percent=listing.tax_percent
    )
    
    # 6. Insert
    new_booking = Booking(
        listing_id=listing.id,
        guest_id=current_user.id,
        check_in=booking_in.check_in,
        check_out=booking_in.check_out,
        num_guests=booking_in.num_guests,
        nights=nights,
        nightly_rate_snapshot=listing.price_per_night,
        subtotal=price_breakdown.subtotal,
        cleaning_fee=price_breakdown.cleaning_fee,
        service_fee=price_breakdown.service_fee,
        taxes=price_breakdown.taxes,
        total_price=price_breakdown.total,
        status=BookingStatus.confirmed, # Mocked straight to confirmed
        message_to_host=booking_in.message_to_host,
        created_at=datetime.utcnow().isoformat()
    )
    
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    
    # Attach listing so it serializes in the response
    new_booking.listing = listing
    
    # Enrich for response
    new_booking.is_upcoming = True
    new_booking.is_past = False
    
    return new_booking

@router.get("/me", response_model=List[BookingRead])
def get_my_trips(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    bookings = db.query(Booking).options(
        joinedload(Booking.listing).selectinload(Listing.photos)
    ).filter(Booking.guest_id == current_user.id).order_by(Booking.check_in.desc()).all()
    today = date.today()
    
    for b in bookings:
        b.is_upcoming = b.check_in >= today
        b.is_past = b.check_out < today
        
    return bookings

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_booking(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    if booking.guest_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    if booking.check_in < date.today():
        raise HTTPException(status_code=400, detail="Cannot cancel past booking")
        
    booking.status = BookingStatus.cancelled
    db.commit()
    return None
