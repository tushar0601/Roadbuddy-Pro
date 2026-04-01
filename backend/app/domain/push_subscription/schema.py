from datetime import datetime
from pydantic import BaseModel, Field


class PushSubscriptionKeysSchema(BaseModel):
    p256dh: str = Field(..., min_length=1, max_length=255)
    auth: str = Field(..., min_length=1, max_length=255)


class PushSubscriptionCreateSchema(BaseModel):
    endpoint: str = Field(..., min_length=1, max_length=1000)
    keys: PushSubscriptionKeysSchema


class PushSubscriptionResponseSchema(BaseModel):
    id: str
    endpoint: str
    p256dh: str
    auth: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    message: str