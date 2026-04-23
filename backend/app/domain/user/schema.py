from datetime import date
from pydantic import BaseModel, EmailStr, Field


class UserSignupRequest(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=255)
    password: str = Field(min_length=6, max_length=128)
    date_of_birth: date


class UserSigninRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str | None = None


class SigninResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    is_admin: bool = False