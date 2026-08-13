from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, listings, bookings, reviews, wishlist, host

app = FastAPI(title="Airbnb Clone API", version="1.0.0")

# CORS - allow all origins in production (demo app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.CORS_ALLOW_ALL else settings.CORS_ORIGINS,
    allow_credentials=False if settings.CORS_ALLOW_ALL else True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(listings.router, prefix="/listings", tags=["Listings"])
app.include_router(host.router, prefix="/host", tags=["Host"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
app.include_router(reviews.router, prefix="/listings", tags=["Reviews"])
app.include_router(wishlist.router, prefix="/wishlist", tags=["Wishlist"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
