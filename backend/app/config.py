from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./airbnb.db"
    SECRET_KEY: str = "your-super-secret-jwt-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    # For production: set CORS_ORIGINS=https://your-app.vercel.app in Render env vars
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://localhost:3000",
    ]
    # Set to True in production to allow all origins (simpler for demo)
    CORS_ALLOW_ALL: bool = False

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
