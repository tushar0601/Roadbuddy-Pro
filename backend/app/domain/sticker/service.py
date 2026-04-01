import secrets
from sqlalchemy.orm import Session

from app.domain.sticker.repository import StickerRepository
from app.enums.sticker import StickerStatus


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

        return sticker