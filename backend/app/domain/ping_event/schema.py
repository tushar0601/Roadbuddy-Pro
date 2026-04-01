from datetime import datetime
from pydantic import BaseModel, Field


class PingCreateRequest(BaseModel):
    reason: str | None = Field(default=None, max_length=100)
    note: str | None = Field(default=None, max_length=1000)


class PingCreateResponse(BaseModel):
    ping_event_id: str
    message: str
    created_at: datetime