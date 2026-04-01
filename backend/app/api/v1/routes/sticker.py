from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.domain.sticker.schema import StickerCreateResponse
from app.domain.sticker.service import StickerService

router = APIRouter(prefix="/sticker", tags=["sticker"])


@router.post("/create", response_model=StickerCreateResponse, status_code=status.HTTP_201_CREATED)
def create_sticker(db: Session = Depends(get_db)):
    service = StickerService(db)
    sticker = service.create_sticker()

    return StickerCreateResponse(
        id=str(sticker.id),
        public_code=sticker.public_code,
        status=sticker.status,
        qr_value=sticker.public_code,
    )