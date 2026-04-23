from sqlalchemy.orm import Session
from app.domain.sticker.model import Sticker


class StickerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_public_code(self, public_code: str) -> Sticker | None:
        return (
            self.db.query(Sticker)
            .filter(Sticker.public_code == public_code)
            .first()
        )

    def create(self, public_code: str, status: str) -> Sticker:
        sticker = Sticker(
            public_code=public_code,
            status=status,
        )
        self.db.add(sticker)
        self.db.flush()
        return sticker

    def list_stickers(self, skip: int = 0, limit: int = 50) -> list[Sticker]:
        return (
            self.db.query(Sticker)
            .order_by(Sticker.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )