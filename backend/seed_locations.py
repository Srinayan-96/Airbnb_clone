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
            # Homes
            {"title": "Chandigarh Luxury Villa", "location": "Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "country": "India", "latitude": 30.7333, "longitude": 76.7794, "price_per_night": 5000, "property_type": "Villa", "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"},
            {"title": "Zirakpur Comfort Stay", "location": "Zirakpur, Punjab", "city": "Zirakpur", "state": "Punjab", "country": "India", "latitude": 30.6425, "longitude": 76.8173, "price_per_night": 3000, "property_type": "Apartment", "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"},
            {"title": "Kasauli Hills Resort", "location": "Kasauli, Himachal Pradesh", "city": "Kasauli", "state": "Himachal Pradesh", "country": "India", "latitude": 30.9013, "longitude": 76.9649, "price_per_night": 7000, "property_type": "Resort", "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"},
            {"title": "Kharar Guest House", "location": "Kharar, Punjab", "city": "Kharar", "state": "Punjab", "country": "India", "latitude": 30.7499, "longitude": 76.6385, "price_per_night": 2000, "property_type": "House", "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"},
            {"title": "Goa Beachfront Cabana", "location": "Goa, India", "city": "Goa", "state": "Goa", "country": "India", "latitude": 15.2993, "longitude": 74.1240, "price_per_night": 8500, "property_type": "Villa", "image": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80"},
            {"title": "Manali Cozy Cabin", "location": "Manali, Himachal Pradesh", "city": "Manali", "state": "Himachal Pradesh", "country": "India", "latitude": 32.2396, "longitude": 77.1887, "price_per_night": 4500, "property_type": "House", "image": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80"},
            
            # Experiences
            {"title": "Traditional Punjabi Cooking Masterclass", "location": "Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "country": "India", "latitude": 30.7333, "longitude": 76.7794, "price_per_night": 1500, "property_type": "Experience", "image": "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"},
            {"title": "Guided Trek in Kasauli Hills", "location": "Kasauli, Himachal Pradesh", "city": "Kasauli", "state": "Himachal Pradesh", "country": "India", "latitude": 30.9013, "longitude": 76.9649, "price_per_night": 2000, "property_type": "Experience", "image": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"},
            {"title": "Old Delhi Street Food Walk", "location": "New Delhi, India", "city": "New Delhi", "state": "Delhi", "country": "India", "latitude": 28.6505, "longitude": 77.2303, "price_per_night": 1200, "property_type": "Experience", "image": "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=800&q=80"},
            {"title": "Sunset Kayaking in Goa", "location": "Goa, India", "city": "Goa", "state": "Goa", "country": "India", "latitude": 15.2993, "longitude": 74.1240, "price_per_night": 2500, "property_type": "Experience", "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"},
            
            # Services
            {"title": "Professional Photoshoot Session", "location": "Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "country": "India", "latitude": 30.7333, "longitude": 76.7794, "price_per_night": 4000, "property_type": "Service", "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"},
            {"title": "Private Chauffeur for a Day", "location": "New Delhi, India", "city": "New Delhi", "state": "Delhi", "country": "India", "latitude": 28.6139, "longitude": 77.2090, "price_per_night": 3500, "property_type": "Service", "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"},
            {"title": "Personal Yoga Instructor", "location": "Goa, India", "city": "Goa", "state": "Goa", "country": "India", "latitude": 15.2993, "longitude": 74.1240, "price_per_night": 1000, "property_type": "Service", "image": "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80"},
            {"title": "Home Cleaning & Organizing", "location": "Zirakpur, Punjab", "city": "Zirakpur", "state": "Punjab", "country": "India", "latitude": 30.6425, "longitude": 76.8173, "price_per_night": 1500, "property_type": "Service", "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"}
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
