from datetime import datetime
from pydantic import BaseModel


class NotificationResponse(BaseModel):
    id: str
    type: str
    title: str
    body: str | None = None
    is_read: bool
    created_at: datetime
    read_at: datetime | None = None


class NotificationReadResponse(BaseModel):
    id: str
    is_read: bool
    read_at: datetime | None = None
    message: str