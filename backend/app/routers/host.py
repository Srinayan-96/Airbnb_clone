from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.dependencies import get_current_host
from app.models.user import User
from app.models.listing import Listing, ListingStatus
from app.models.photo import ListingPhoto
from app.models.booking import Booking
from app.schemas.listing import ListingCreate, ListingUpdate, ListingDetailRead, ListingCardRead, ListingPhotoBase

router = APIRouter()

@router.post("/listings")
def create_listing(
    listing_in: ListingCreate, 
    db: Session = Depends(get_db),
    current_host: User = Depends(get_current_host)
):
    new_listing = Listing(
        host_id=current_host.id,
        title=listing_in.title,
        description=listing_in.description,
        property_type=listing_in.property_type,
        city=listing_in.city,
        state=listing_in.state,
        country=listing_in.country,
        address_line=listing_in.address_line,
        latitude=listing_in.latitude,
        longitude=listing_in.longitude,
        max_guests=listing_in.max_guests,
        bedrooms=listing_in.bedrooms,
        beds=listing_in.beds,
        bathrooms=listing_in.bathrooms,
        price_per_night=listing_in.price_per_night,
        cleaning_fee=listing_in.cleaning_fee,
        service_fee_percent=listing_in.service_fee_percent,
        tax_percent=listing_in.tax_percent,
        cancellation_policy=listing_in.cancellation_policy,
        house_rules=listing_in.house_rules,
        safety_info=listing_in.safety_info,
        status=ListingStatus.published,
        created_at=datetime.utcnow().isoformat(),
        updated_at=datetime.utcnow().isoformat()
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    
    # Add photos
    for photo in listing_in.photos:
        new_photo = ListingPhoto(listing_id=new_listing.id, url=photo.url, position=photo.position)
        db.add(new_photo)
        
    db.commit()
    
    # Return just the ID for the frontend
    return {"id": new_listing.id}

@router.patch("/listings/{id}")
def update_listing(
    id: int,
    listing_in: ListingUpdate,
    db: Session = Depends(get_db),
    current_host: User = Depends(get_current_host)
):
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    if listing.host_id != current_host.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    update_data = listing_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(listing, key, value)
        
    listing.updated_at = datetime.utcnow().isoformat()
    db.commit()
    db.refresh(listing)
    return listing

@router.delete("/listings/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_listing(
    id: int,
    db: Session = Depends(get_db),
    current_host: User = Depends(get_current_host)
):
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    if listing.host_id != current_host.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    # Soft delete would be better, but doing hard delete for simplicity here
    db.delete(listing)
    db.commit()
    return None

@router.patch("/listings/{id}/photos")
def update_listing_photos(
    id: int,
    photos: List[ListingPhotoBase],
    db: Session = Depends(get_db),
    current_host: User = Depends(get_current_host)
):
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    if listing.host_id != current_host.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    # Delete existing
    db.query(ListingPhoto).filter(ListingPhoto.listing_id == id).delete()
    
    # Add new
    for photo in photos:
        new_photo = ListingPhoto(listing_id=id, url=photo.url, position=photo.position)
        db.add(new_photo)
        
    db.commit()
    return {"status": "success"}

@router.get("/listings", response_model=List[dict])
def get_host_listings(
    db: Session = Depends(get_db),
    current_host: User = Depends(get_current_host)
):
    listings = db.query(Listing).filter(Listing.host_id == current_host.id).all()
    # Simplified mapping to dictionary for speed
    return [{
        "id": l.id, 
        "title": l.title, 
        "city": l.city,
        "state": l.state,
        "price_per_night": float(l.price_per_night),
        "status": l.status
    } for l in listings]

@router.get("/listings/{id}/bookings")
def get_host_listing_bookings(
    id: int,
    db: Session = Depends(get_db),
    current_host: User = Depends(get_current_host)
):
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    if listing.host_id != current_host.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    bookings = db.query(Booking).filter(Booking.listing_id == id).all()
    return bookings
