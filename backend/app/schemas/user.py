from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime

class RoleEnum(str, Enum):
    guest = "guest"
    host = "host"
    both = "both"

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    work: Optional[str] = None
    school: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: RoleEnum = RoleEnum.guest

class UserRead(UserBase):
    id: int
    role: RoleEnum
    is_superhost: bool
    response_rate: Optional[int] = None
    created_at: Optional[str] = None

    model_config = {"from_attributes": True}
