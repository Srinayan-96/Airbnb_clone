import asyncio
from sqlalchemy.orm import sessionmaker
from app.database import engine
from app.models.listing import Listing
from app.models.user import User
from app.models.photo import ListingPhoto
import sqlalchemy as sa

def seed():
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Get host user
        result = session.execute(sa.select(User))
        host = result.scalars().first()
        
        # Clear existing to avoid duplicates
        session.execute(sa.delete(Listing))
        session.commit()
        
        if not host:
            host = User(email="testhost2@airbnb.com", full_name="Test Host", hashed_password="hash")
            session.add(host)
            session.commit()
            session.refresh(host)
            
        locations = [
            {"title": "Chandigarh Luxury Villa", "location": "Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "country": "India", "latitude": 30.7333, "longitude": 76.7794, "price_per_night": 5000, "property_type": "Villa", "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"},
            {"title": "Zirakpur Comfort Stay", "location": "Zirakpur, Punjab", "city": "Zirakpur", "state": "Punjab", "country": "India", "latitude": 30.6425, "longitude": 76.8173, "price_per_night": 3000, "property_type": "Apartment", "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"},
            {"title": "Kasauli Hills Resort", "location": "Kasauli, Himachal Pradesh", "city": "Kasauli", "state": "Himachal Pradesh", "country": "India", "latitude": 30.9013, "longitude": 76.9649, "price_per_night": 7000, "property_type": "Resort", "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"},
            {"title": "Kharar Guest House", "location": "Kharar, Punjab", "city": "Kharar", "state": "Punjab", "country": "India", "latitude": 30.7499, "longitude": 76.6385, "price_per_night": 2000, "property_type": "House", "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"}
        ]
        
        for loc in locations:
            listing = Listing(
                host_id=host.id,
                title=loc["title"],
                description="A beautiful place to stay.",
                property_type=loc["property_type"],
                max_guests=4,
                bedrooms=2,
                beds=2,
                bathrooms=1.0,
                price_per_night=loc["price_per_night"],
                address_line=loc["location"],
                city=loc["city"],
                state=loc["state"],
                country=loc["country"],
                latitude=loc["latitude"],
                longitude=loc["longitude"],
                status="published"
            )
            session.add(listing)
            session.commit()
            session.refresh(listing)
            
            # Add photo
            photo = ListingPhoto(listing_id=listing.id, url=loc["image"], position=0)
            session.add(photo)
            session.commit()
        
        session.commit()
        print("Seeded successfully.")

if __name__ == "__main__":
    seed()
