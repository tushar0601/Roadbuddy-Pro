from sqlalchemy.orm import Session
from app.domain.user.model import AppUser


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> AppUser | None:
        return self.db.query(AppUser).filter(AppUser.email == email).first()

    def create(
        self,
        email: str,
        full_name: str,
        password_hash: str,
        date_of_birth,
    ) -> AppUser:
        user = AppUser(
            email=email,
            full_name=full_name,
            password_hash=password_hash,
            date_of_birth=date_of_birth,
            is_active=True,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user