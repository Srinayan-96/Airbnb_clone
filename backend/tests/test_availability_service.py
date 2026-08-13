from datetime import date
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.listing import Listing
from app.models.booking import Booking, BookingStatus
from app.services.availability_service import has_overlap

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Setup mock data
    listing = Listing(id=1, title="Test Listing")
    booking = Booking(
        id=1, 
        listing_id=1, 
        check_in=date(2026, 8, 10), 
        check_out=date(2026, 8, 15),
        status=BookingStatus.confirmed
    )
    db.add(listing)
    db.add(booking)
    db.commit()
    
    yield db
    
    db.close()
    Base.metadata.drop_all(bind=engine)

def test_has_overlap_exact(db):
    assert has_overlap(db, 1, date(2026, 8, 10), date(2026, 8, 15)) == True

def test_has_overlap_partial_start(db):
    assert has_overlap(db, 1, date(2026, 8, 8), date(2026, 8, 12)) == True

def test_has_overlap_partial_end(db):
    assert has_overlap(db, 1, date(2026, 8, 14), date(2026, 8, 20)) == True

def test_has_overlap_fully_contained(db):
    assert has_overlap(db, 1, date(2026, 8, 11), date(2026, 8, 13)) == True

def test_no_overlap_adjacent_before(db):
    # Check out is same day as other check in - allowed
    assert has_overlap(db, 1, date(2026, 8, 1), date(2026, 8, 10)) == False

def test_no_overlap_adjacent_after(db):
    # Check in is same day as other check out - allowed
    assert has_overlap(db, 1, date(2026, 8, 15), date(2026, 8, 20)) == False

def test_no_overlap_far_apart(db):
    assert has_overlap(db, 1, date(2026, 9, 1), date(2026, 9, 10)) == False

def test_exclude_booking(db):
    assert has_overlap(db, 1, date(2026, 8, 10), date(2026, 8, 15), exclude_booking_id=1) == False
