from pydantic import BaseModel


class StickerCreateResponse(BaseModel):
    id: str
    public_code: str
    status: str
    qr_value: str