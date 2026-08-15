from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, RoleEnum
from app.schemas.auth import AuthResponse, SignupRequest, Token
from app.schemas.user import UserRead
from app.services.auth_service import verify_password, get_password_hash, create_access_token
from app.config import settings
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/signup", response_model=AuthResponse)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(request.password)
    new_user = User(
        email=request.email,
        hashed_password=hashed_password,
        full_name=request.full_name,
        role=request.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(new_user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": new_user}

@router.post("/login", response_model=AuthResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    
    # Auto-create user for demo purposes if they don't exist
    if not user:
        hashed_password = get_password_hash(form_data.password)
        name_part = form_data.username.split('@')[0]
        full_name = name_part.replace('.', ' ').title()
        user = User(
            email=form_data.username,
            hashed_password=hashed_password,
            full_name=full_name,
            role=RoleEnum.guest
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=UserRead)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
