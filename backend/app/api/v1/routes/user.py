from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.domain.user.schema import (
    UserSignupRequest,
    UserSigninRequest,
    UserResponse,
    SigninResponse,
)
from app.domain.user.service import UserService

router = APIRouter(prefix="/user", tags=["user"])


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: UserSignupRequest, db: Session = Depends(get_db)):
    service = UserService(db)
    user = service.signup(
        email=payload.email,
        name=payload.name,
        password=payload.password,
        date_of_birth=payload.date_of_birth,
    )
    return UserResponse(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
    )


@router.post("/signin", response_model=SigninResponse)
def signin(payload: UserSigninRequest, db: Session = Depends(get_db)):
    service = UserService(db)
    token = service.signin(
        email=payload.email,
        password=payload.password,
    )
    return SigninResponse(access_token=token)