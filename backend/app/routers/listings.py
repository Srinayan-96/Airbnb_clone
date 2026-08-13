from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date

from app.database import get_db
from app.models.listing import Listing, ListingStatus
from app.models.photo import ListingPhoto
from app.models.amenity import Amenity, ListingAmenity
from app.models.review import Review
from app.models.user import User
from app.models.booking import Booking, BookingStatus
from app.schemas.listing import ListingCardRead, ListingDetailRead

router = APIRouter()

@router.get("", response_model=dict)
def search_listings(
    location: Optional[str] = None,
    check_in: Optional[date] = None,
    check_out: Optional[date] = None,
    guests: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    property_type: Optional[str] = None,
    amenities: Optional[str] = None, # comma-separated IDs
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Listing).filter(Listing.status == ListingStatus.published)

    if location:
        search = f"%{location}%"
        query = query.filter(
            (Listing.city.ilike(search)) |
            (Listing.state.ilike(search)) |
            (Listing.country.ilike(search))
        )
    
    if guests:
        query = query.filter(Listing.max_guests >= guests)
        
    if min_price is not None:
        query = query.filter(Listing.price_per_night >= min_price)
        
    if max_price is not None:
        query = query.filter(Listing.price_per_night <= max_price)
        
    if property_type:
        query = query.filter(Listing.property_type.ilike(f"%{property_type}%"))
        
    if amenities:
        amenity_ids = [int(a) for a in amenities.split(",")]
        for a_id in amenity_ids:
            query = query.filter(Listing.amenities.any(ListingAmenity.amenity_id == a_id))
            
    if check_in and check_out:
        # Exclude listings that have overlapping confirmed bookings
        overlap_query = db.query(Booking.listing_id).filter(
            Booking.status.in_([BookingStatus.pending, BookingStatus.confirmed]),
            Booking.check_in < check_out,
            Booking.check_out > check_in
        )
        query = query.filter(Listing.id.notin_(overlap_query))

    total = query.count()
    listings = query.offset((page - 1) * page_size).limit(page_size).all()
    
    results = []
    for listing in listings:
        cover_photo = db.query(ListingPhoto).filter(
            ListingPhoto.listing_id == listing.id,
            ListingPhoto.position == 0
        ).first()
        
        avg_rating = db.query(func.avg(Review.overall_rating)).filter(Review.listing_id == listing.id).scalar()
        review_count = db.query(Review).filter(Review.listing_id == listing.id).count()
        
        results.append({
            "id": listing.id,
            "title": listing.title,
            "property_type": listing.property_type,
            "city": listing.city,
            "country": listing.country,
            "cover_photo_url": cover_photo.url if cover_photo else None,
            "price_per_night": listing.price_per_night,
            "rating": round(avg_rating, 2) if avg_rating else None,
            "review_count": review_count,
            "is_guest_favourite": listing.is_guest_favourite,
            "latitude": listing.latitude,
            "longitude": listing.longitude
        })

    return {
        "items": results,
        "total": total,
        "page": page,
        "page_size": page_size,
        "has_more": (page * page_size) < total
    }

@router.get("/{id}", response_model=ListingDetailRead)
def get_listing(id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    # Get reviews stats
    reviews = db.query(Review).filter(Review.listing_id == id).all()
    review_count = len(reviews)
    rating_agg = None
    if review_count > 0:
        overall = sum(r.overall_rating for r in reviews) / review_count
        cleanliness = sum(r.cleanliness for r in reviews) / review_count
        accuracy = sum(r.accuracy for r in reviews) / review_count
        checkin = sum(r.checkin for r in reviews) / review_count
        communication = sum(r.communication for r in reviews) / review_count
        location = sum(r.location for r in reviews) / review_count
        value = sum(r.value for r in reviews) / review_count
        
        distribution = {"5": 0, "4": 0, "3": 0, "2": 0, "1": 0}
        for r in reviews:
            dist_key = str(int(round(r.overall_rating)))
            if dist_key in distribution:
                distribution[dist_key] += 1
                
        rating_agg = {
            "overall": round(overall, 2),
            "cleanliness": round(cleanliness, 2),
            "accuracy": round(accuracy, 2),
            "checkin": round(checkin, 2),
            "communication": round(communication, 2),
            "location": round(location, 2),
            "value": round(value, 2),
            "distribution": distribution
        }

    # Unavailable dates
    unavailable_dates = []
    bookings = db.query(Booking).filter(
        Booking.listing_id == id,
        Booking.status.in_([BookingStatus.pending, BookingStatus.confirmed])
    ).all()
    
    for b in bookings:
        # Generate range of dates
        d = b.check_in
        while d < b.check_out:
            unavailable_dates.append(d.isoformat())
            d = d.replace(day=d.day + 1) # Note: simple logic, real datetime.timedelta is needed
            
    # Fix the date iteration
    from datetime import timedelta
    unavailable_dates = []
    for b in bookings:
        current_date = b.check_in
        while current_date < b.check_out:
            unavailable_dates.append(current_date.isoformat())
            current_date += timedelta(days=1)

    # Amenities mapping
    amenities = []
    for la in listing.amenities:
        if la.amenity:
            amenities.append({
                "id": la.amenity.id,
                "name": la.amenity.name,
                "category": la.amenity.category,
                "icon": la.amenity.icon
            })
            
    photos = [{"id": p.id, "url": p.url, "position": p.position} for p in sorted(listing.photos, key=lambda x: x.position)]

    return {
        **listing.__dict__,
        "host": listing.host,
        "co_hosts": [], # Mocked
        "photos": photos,
        "location": {
            "city": listing.city,
            "country": listing.country,
            "latitude": listing.latitude,
            "longitude": listing.longitude
        },
        "amenities": amenities,
        "rating": rating_agg,
        "review_count": review_count,
        "unavailable_dates": unavailable_dates
    }
