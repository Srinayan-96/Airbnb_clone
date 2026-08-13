from pydantic import BaseModel, EmailStr
from .user import UserRead, RoleEnum

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserRead

class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: RoleEnum
