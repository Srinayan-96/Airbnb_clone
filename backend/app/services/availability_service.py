from sqlalchemy.orm import Session
from datetime import date
from app.models.booking import Booking, BookingStatus

def has_overlap(db: Session, listing_id: int, check_in: date, check_out: date, exclude_booking_id: int | None = None) -> bool:
    """
    Two ranges [a_start, a_end) and [b_start, b_end) overlap iff a_start < b_end and b_start < a_end.
    """
    q = db.query(Booking).filter(
        Booking.listing_id == listing_id,
        Booking.status.in_([BookingStatus.pending, BookingStatus.confirmed]),
        Booking.check_in < check_out,
        Booking.check_out > check_in,
    )
    if exclude_booking_id:
        q = q.filter(Booking.id != exclude_booking_id)
    
    return db.query(q.exists()).scalar()
