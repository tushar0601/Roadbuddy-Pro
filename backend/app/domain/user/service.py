from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password, create_access_token
from app.domain.user.repository import UserRepository


class UserService:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def signup(self, email: str, name: str, password: str, date_of_birth):
        existing_user = self.repo.get_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        password_hash = hash_password(password)

        user = self.repo.create(
            email=email,
            full_name=name,
            password_hash=password_hash,
            date_of_birth=date_of_birth,
        )
        return user

    def signin(self, email: str, password: str) -> str:
        user = self.repo.get_by_email(email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        return create_access_token(user.email)