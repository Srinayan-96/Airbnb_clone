from sqlalchemy.orm import Session
from datetime import date, datetime, timedelta
import random
import logging

from app.database import SessionLocal, engine, Base
from app.models.user import User, RoleEnum
from app.models.listing import Listing, ListingStatus
from app.models.photo import ListingPhoto
from app.models.amenity import Amenity, ListingAmenity
from app.models.booking import Booking, BookingStatus
from app.models.review import Review
from app.services.auth_service import get_password_hash

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_data(reset=False):
    if reset:
        logger.info("Dropping all tables...")
        Base.metadata.drop_all(bind=engine)
        logger.info("Creating all tables...")
        Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).first() and not reset:
            logger.info("Database already seeded. Skipping.")
            return

        logger.info("Starting database seed...")

        # 1. Users
        users_data = [
            {"email": "host1@example.com", "full_name": "Nidhi", "role": RoleEnum.both, "is_superhost": True, "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200", "bio": "Curating spaces!"},
            {"email": "host2@example.com", "full_name": "Sanya", "role": RoleEnum.host, "is_superhost": False, "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"},
            {"email": "host3@example.com", "full_name": "Raj", "role": RoleEnum.host, "is_superhost": True, "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"},
            {"email": "guest1@example.com", "full_name": "Alice", "role": RoleEnum.guest, "is_superhost": False, "avatar_url": None},
            {"email": "guest2@example.com", "full_name": "Bob", "role": RoleEnum.guest, "is_superhost": False, "avatar_url": None},
        ]
        
        users = []
        for ud in users_data:
            u = User(
                email=ud["email"],
                hashed_password=get_password_hash("password123"),
                full_name=ud["full_name"],
                role=ud["role"],
                is_superhost=ud["is_superhost"],
                avatar_url=ud["avatar_url"],
                bio=ud.get("bio"),
                created_at=datetime.utcnow().isoformat()
            )
            db.add(u)
            users.append(u)
            
        db.commit()
        for u in users: db.refresh(u)

        # 2. Amenities
        amenities_data = [
            ("WiFi", "Internet & office", "wifi"),
            ("Free parking", "Parking & facilities", "car"),
            ("Air conditioning", "Heating & cooling", "snowflake"),
            ("Kitchen", "Kitchen & dining", "chef-hat"),
            ("Washer", "Bathroom & laundry", "washing-machine"),
            ("TV", "Entertainment", "tv"),
            ("Pool", "Outdoor", "waves")
        ]
        
        amenities = []
        for ad in amenities_data:
            a = Amenity(name=ad[0], category=ad[1], icon=ad[2])
            db.add(a)
            amenities.append(a)
            
        db.commit()
        for a in amenities: db.refresh(a)

        # 3. Listings
        photos_pool = [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1c24240f57?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200"
        ]
        
        listings_data = [
            {
                "host_id": users[0].id,
                "title": "The Atelier Residence | Luxury Living in Sector 19",
                "description": "Experience luxury living in the heart of Chandigarh.",
                "property_type": "Entire home",
                "city": "Chandigarh",
                "state": "Chandigarh",
                "country": "India",
                "latitude": 30.74,
                "longitude": 76.79,
                "max_guests": 4,
                "bedrooms": 2,
                "beds": 4,
                "bathrooms": 2.5,
                "price_per_night": 10498.83,
                "is_guest_favourite": True
            },
            {
                "host_id": users[1].id,
                "title": "Cozy Mountain Cabin",
                "description": "Escape to this beautiful cabin.",
                "property_type": "Cabin",
                "city": "Manali",
                "state": "Himachal Pradesh",
                "country": "India",
                "latitude": 32.23,
                "longitude": 77.18,
                "max_guests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1,
                "price_per_night": 5000.00,
                "is_guest_favourite": False
            },
            {
                "host_id": users[2].id,
                "title": "Modern Apartment with Ocean View",
                "description": "Wake up to the sound of waves.",
                "property_type": "Apartment",
                "city": "Mumbai",
                "state": "Maharashtra",
                "country": "India",
                "latitude": 19.07,
                "longitude": 72.87,
                "max_guests": 6,
                "bedrooms": 3,
                "beds": 3,
                "bathrooms": 2,
                "price_per_night": 15000.00,
                "is_guest_favourite": True
            },
             {
                "host_id": users[0].id,
                "title": "Heritage Villa in Old City",
                "description": "Step back in time.",
                "property_type": "Villa",
                "city": "Jaipur",
                "state": "Rajasthan",
                "country": "India",
                "latitude": 26.91,
                "longitude": 75.78,
                "max_guests": 8,
                "bedrooms": 4,
                "beds": 4,
                "bathrooms": 4,
                "price_per_night": 20000.00,
                "is_guest_favourite": True
            },
            {
                "host_id": users[1].id,
                "title": "Minimalist Studio Downtown",
                "description": "Perfect for business travelers.",
                "property_type": "Studio",
                "city": "Bengaluru",
                "state": "Karnataka",
                "country": "India",
                "latitude": 12.97,
                "longitude": 77.59,
                "max_guests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1,
                "price_per_night": 3500.00,
                "is_guest_favourite": False
            },
            {
                "host_id": users[2].id,
                "title": "Beachfront Shack",
                "description": "Sand at your doorstep.",
                "property_type": "Hut",
                "city": "Goa",
                "state": "Goa",
                "country": "India",
                "latitude": 15.29,
                "longitude": 74.12,
                "max_guests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1,
                "price_per_night": 2500.00,
                "is_guest_favourite": False
            },
             {
                "host_id": users[0].id,
                "title": "Luxury Penthouse",
                "description": "City views from the top.",
                "property_type": "Apartment",
                "city": "Delhi",
                "state": "Delhi",
                "country": "India",
                "latitude": 28.61,
                "longitude": 77.20,
                "max_guests": 6,
                "bedrooms": 3,
                "beds": 3,
                "bathrooms": 3,
                "price_per_night": 25000.00,
                "is_guest_favourite": True
            },
            {
                "host_id": users[1].id,
                "title": "Quiet Suburban Home",
                "description": "Family friendly neighborhood.",
                "property_type": "House",
                "city": "Pune",
                "state": "Maharashtra",
                "country": "India",
                "latitude": 18.52,
                "longitude": 73.85,
                "max_guests": 5,
                "bedrooms": 2,
                "beds": 3,
                "bathrooms": 2,
                "price_per_night": 6000.00,
                "is_guest_favourite": False
            },
            {
                "host_id": users[2].id,
                "title": "Rustic Farmhouse Retreat",
                "description": "Experience life on the farm with modern amenities.",
                "property_type": "Farmhouse",
                "city": "Nashik",
                "state": "Maharashtra",
                "country": "India",
                "latitude": 19.99,
                "longitude": 73.78,
                "max_guests": 10,
                "bedrooms": 5,
                "beds": 6,
                "bathrooms": 4,
                "price_per_night": 12000.00,
                "is_guest_favourite": True
            },
            {
                "host_id": users[0].id,
                "title": "Riverside Treehouse",
                "description": "A magical stay above the canopy.",
                "property_type": "Treehouse",
                "city": "Munnar",
                "state": "Kerala",
                "country": "India",
                "latitude": 10.08,
                "longitude": 77.06,
                "max_guests": 2,
                "bedrooms": 1,
                "beds": 1,
                "bathrooms": 1,
                "price_per_night": 8500.00,
                "is_guest_favourite": True
            }
        ]
        
        listings = []
        for ld in listings_data:
            l = Listing(
                **ld,
                status=ListingStatus.published,
                created_at=datetime.utcnow().isoformat(),
                updated_at=datetime.utcnow().isoformat(),
                house_rules="Check-in: 2:00pm–10:00pm / Checkout before 12:00pm",
                cancellation_policy="flexible"
            )
            db.add(l)
            listings.append(l)
            
        db.commit()
        for l in listings: db.refresh(l)
        
        # Link photos and amenities
        for l in listings:
            # Add 5 random photos
            random.shuffle(photos_pool)
            for i in range(5):
                db.add(ListingPhoto(listing_id=l.id, url=photos_pool[i], position=i))
            
            # Add random amenities
            for a in random.sample(amenities, k=random.randint(3, 7)):
                db.add(ListingAmenity(listing_id=l.id, amenity_id=a.id))
                
        db.commit()

        # 4. Bookings
        logger.info("Seeding bookings...")
        today = date.today()
        # Creating a specific blocked date range for testing on the Atelier listing
        db.add(Booking(
            listing_id=listings[0].id,
            guest_id=users[3].id,
            check_in=today + timedelta(days=2),
            check_out=today + timedelta(days=5),
            num_guests=2,
            nights=3,
            nightly_rate_snapshot=10498.83,
            subtotal=31496.49,
            cleaning_fee=0,
            service_fee=1574.82,
            taxes=3968.56,
            total_price=37039.87,
            status=BookingStatus.confirmed,
            created_at=datetime.utcnow().isoformat()
        ))
        
        # Another booking far in the future
        db.add(Booking(
            listing_id=listings[0].id,
            guest_id=users[4].id,
            check_in=today + timedelta(days=20),
            check_out=today + timedelta(days=25),
            num_guests=4,
            nights=5,
            nightly_rate_snapshot=10498.83,
            subtotal=52494.15,
            cleaning_fee=0,
            service_fee=2624.71,
            taxes=6614.26,
            total_price=61733.12,
            status=BookingStatus.confirmed,
            created_at=datetime.utcnow().isoformat()
        ))
        
        # Some past bookings for reviews
        past_bookings = []
        for i in range(20):
            l = random.choice(listings)
            u = random.choice([users[3], users[4]])
            past_date = today - timedelta(days=random.randint(10, 100))
            b = Booking(
                listing_id=l.id,
                guest_id=u.id,
                check_in=past_date,
                check_out=past_date + timedelta(days=random.randint(1, 5)),
                num_guests=1,
                nights=2,
                nightly_rate_snapshot=5000,
                subtotal=10000,
                cleaning_fee=0,
                service_fee=500,
                taxes=1260,
                total_price=11760,
                status=BookingStatus.completed,
                created_at=(past_date - timedelta(days=10)).isoformat()
            )
            db.add(b)
            past_bookings.append(b)
            
        db.commit()
        for b in past_bookings: db.refresh(b)
        
        # 5. Reviews
        logger.info("Seeding reviews...")
        # Add exactly 19 reviews to the Atelier listing to match prompt
        for i in range(19):
            # Create a mock completed booking for each review just to satisfy the constraint
            past_date = today - timedelta(days=random.randint(10, 300))
            b = Booking(
                listing_id=listings[0].id,
                guest_id=users[3].id,
                check_in=past_date,
                check_out=past_date + timedelta(days=2),
                num_guests=2,
                nights=2,
                nightly_rate_snapshot=10000,
                subtotal=20000,
                cleaning_fee=0,
                service_fee=1000,
                taxes=2000,
                total_price=23000,
                status=BookingStatus.completed,
                created_at=past_date.isoformat()
            )
            db.add(b)
            db.commit()
            db.refresh(b)
            
            val = random.uniform(4.5, 5.0)
            db.add(Review(
                listing_id=listings[0].id,
                booking_id=b.id,
                author_id=users[3].id,
                overall_rating=val,
                cleanliness=val,
                accuracy=val,
                checkin=val,
                communication=val,
                location=val,
                value=val,
                comment="Great place, loved the stay!",
                created_at=(past_date + timedelta(days=3)).isoformat()
            ))
            
        # Add reviews to others
        for pb in past_bookings:
            val = random.uniform(3.0, 5.0)
            db.add(Review(
                listing_id=pb.listing_id,
                booking_id=pb.id,
                author_id=pb.guest_id,
                overall_rating=val,
                cleanliness=val,
                accuracy=val,
                checkin=val,
                communication=val,
                location=val,
                value=val,
                comment="Nice experience.",
                created_at=(pb.check_out + timedelta(days=1)).isoformat()
            ))
            
        db.commit()

        logger.info("Database seeded successfully!")

    finally:
        db.close()

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Reset DB before seeding")
    args = parser.parse_args()
    seed_data(reset=args.reset)
