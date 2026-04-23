from pydantic import BaseModel, Field
from datetime import datetime

class StickerCreateResponse(BaseModel):
    id: str
    public_code: str
    status: str
    qr_value: str

class StickerCreateBatchRequest(BaseModel):
    count: int = Field(..., ge=1, le=200)


class StickerListItemResponse(BaseModel):
    id: str
    public_code: str
    status: str
    created_at: datetime


class StickerCreateBatchResponse(BaseModel):
    stickers: list[StickerListItemResponse]
    message: str

class PublicStickerResponse(BaseModel):
    public_code: str
    status: str
    is_active: bool