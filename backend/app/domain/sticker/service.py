import secrets
from sqlalchemy.orm import Session

from app.domain.sticker.repository import StickerRepository
from app.enums.sticker import StickerStatus
from fastapi import HTTPException, status

class StickerService:
    CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    CODE_LENGTH = 8

    def __init__(self, db: Session):
        self.db = db
        self.repo = StickerRepository(db)

    def _generate_public_code(self) -> str:
        return "".join(
            secrets.choice(self.CODE_ALPHABET)
            for _ in range(self.CODE_LENGTH)
        )

    def _generate_unique_public_code(self) -> str:
        for _ in range(20):
            code = self._generate_public_code()
            existing = self.repo.get_by_public_code(code)
            if not existing:
                return code

        raise ValueError("Could not generate unique public code")

    def create_sticker(self):
        public_code = self._generate_unique_public_code()

        sticker = self.repo.create(
            public_code=public_code,
            status=StickerStatus.UNCLAIMED,
        )

        self.db.commit()
        self.db.refresh(sticker)
        return sticker

    def create_stickers_batch(self, count: int):
        stickers = []

        for _ in range(count):
            public_code = self._generate_unique_public_code()
            sticker = self.repo.create(
                public_code=public_code,
                status=StickerStatus.UNCLAIMED,
            )
            stickers.append(sticker)

        self.db.commit()

        for sticker in stickers:
            self.db.refresh(sticker)

        return stickers

    def list_stickers(self, skip: int = 0, limit: int = 50):
        return self.repo.list_stickers(skip=skip, limit=limit)
    
    def get_public_sticker(self, public_code: str):
        sticker = self.repo.get_by_public_code(public_code)

        if not sticker:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sticker not found",
            )

        is_active = sticker.status == StickerStatus.ACTIVE

        return {
            "public_code": sticker.public_code,
            "status": sticker.status,
            "is_active": is_active,
        }