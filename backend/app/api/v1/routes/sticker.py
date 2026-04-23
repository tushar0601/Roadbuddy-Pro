from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin_user, get_db
from app.domain.sticker.schema import (
    StickerCreateBatchRequest,
    StickerCreateBatchResponse,
    StickerCreateResponse,
    StickerListItemResponse,
)
from app.domain.sticker.service import StickerService
from app.domain.user.model import AppUser
from app.core.config import settings

router = APIRouter(prefix="/sticker", tags=["sticker"])

def get_sticker_service(db: Session = Depends(get_db)) -> StickerService:
    return StickerService(db=db)


@router.post("/create", response_model=StickerCreateResponse, status_code=status.HTTP_201_CREATED)
def create_sticker(
    service: StickerService = Depends(get_sticker_service),
    current_admin: AppUser = Depends(get_current_admin_user),
):
    sticker = service.create_sticker()

    qr_value = f"{settings.FRONTEND_BASE_URL}/s/{sticker.public_code}"

    return StickerCreateResponse(
        id=str(sticker.id),
        public_code=sticker.public_code,
        status=sticker.status,
        qr_value=qr_value,
    )


@router.post(
    "/create-batch",
    response_model=StickerCreateBatchResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_stickers_batch(
    payload: StickerCreateBatchRequest,
    service: StickerService = Depends(get_sticker_service),
    current_admin: AppUser = Depends(get_current_admin_user),
):
    stickers = service.create_stickers_batch(payload.count)

    return StickerCreateBatchResponse(
        stickers=[
            StickerListItemResponse(
                id=str(sticker.id),
                public_code=sticker.public_code,
                status=sticker.status,
                created_at=sticker.created_at,
            )
            for sticker in stickers
        ],
        message="Stickers generated successfully",
    )


@router.get("", response_model=list[StickerListItemResponse])
def list_stickers(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
    service: StickerService = Depends(get_sticker_service),
    current_admin: AppUser = Depends(get_current_admin_user),
):
    stickers = service.list_stickers(skip=skip, limit=limit)

    return [
        StickerListItemResponse(
            id=str(sticker.id),
            public_code=sticker.public_code,
            status=sticker.status,
            created_at=sticker.created_at,
        )
        for sticker in stickers
    ]