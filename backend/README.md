# Airbnb Clone - Backend API

This is the fully-featured FastAPI backend for the Airbnb Clone project, providing production-level implementations for the core Airbnb experience, including Listings, Bookings, Host CRUD, Reviews, Wishlists, and mock Authentication.

## Tech Stack
- **Framework:** FastAPI (Python 3.11+)
- **ORM:** SQLAlchemy 2.0
- **Database:** SQLite (`airbnb.db`)
- **Validation:** Pydantic v2
- **Auth:** JWT-based mock auth with `passlib[bcrypt]` and `python-jose`
- **Migrations:** Alembic
- **Testing:** Pytest with HTTPX TestClient

## Architecture Overview

The backend uses a decoupled structure dividing domain responsibilities:
```
app/
├── routers/        # API route endpoints (controllers)
├── services/       # Pure business logic (pricing, booking overlap, auth)
├── schemas/        # Pydantic models (validation & serialization)
├── models/         # SQLAlchemy ORM definitions
└── database.py     # SQLite DB setup & sessions
```

*Requests flow: `Router` -> `Service` -> `Database (SQLAlchemy)` -> `Router` -> `Schema (Pydantic serialization)`*

## Database Schema

- **Users:** `id`, `email`, `hashed_password`, `role(guest/host/both)`, `is_superhost`
- **Listings:** `id`, `host_id`, `title`, `property_type`, `price_per_night`, `cleaning_fee`, `location`
- **Listing Photos:** `url`, `position` (position 0 is hero)
- **Amenities:** Many-to-many relationship with Listings
- **Bookings:** `check_in`, `check_out`, `num_guests`, `nights`, `status`, computed totals
- **Reviews:** Strict 1-to-1 against completed bookings, aggregate stats
- **Wishlist:** Saved listings per user

## API Overview

Interactive OpenAPI documentation is generated automatically by FastAPI. 
After starting the server, view all endpoints and schemas at:
- **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Local Setup

1. **Create Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/Scripts/activate # Windows
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   *(Ensure you use `bcrypt==4.0.1` for compatibility with `passlib` on Python 3.12+)*

3. **Database Migrations:**
   Run Alembic to initialize the SQLite database (`airbnb.db`):
   ```bash
   python -m alembic upgrade head
   ```

4. **Seed Database:**
   Populate the database with rich test data (Users, Listings, Bookings, Reviews):
   ```bash
   python -m app.seed --reset
   ```

5. **Start the Server:**
   ```bash
   uvicorn app.main:app --reload
   ```

## Test Credentials

The database is seeded with several users. Use these credentials to test endpoints requiring auth:

- **Host (Nidhi - Superhost, owns Atelier):**
  - Email: `host1@example.com`
  - Password: `password123`
- **Guest (Alice):**
  - Email: `guest1@example.com`
  - Password: `password123`

## Assumptions & Mocked Sections

Per the assignment parameters, certain non-core features are mocked or simplified:
1. **Authentication:** Uses real JWT tokens and bcrypt hashing, but completely skips email verification, password resets, and OAuth integrations.
2. **Payments:** No real payment gateway (Stripe/PayPal) is integrated. Hitting `POST /bookings` creates a booking straight to `confirmed` status.
3. **Messaging:** Stub implementation. Real-time sockets/websockets are out of scope.
4. **Photos:** Real file upload handling to S3 is skipped. The API and Seed scripts accept plain URLs (e.g. Unsplash) for mock listing photos.
