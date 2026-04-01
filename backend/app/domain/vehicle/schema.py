from pydantic import BaseModel, Field, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List

class VehicleRegisterRequest(BaseModel):
    sticker_code: str = Field(min_length=1, max_length=50)
    plate_no: str = Field(min_length=4, max_length=20)


class VehicleRegisterResponse(BaseModel):
    vehicle_id: str
    sticker_code: str
    status: str

class VehicleResponse(BaseModel):
    id: UUID
    plate_last_4: Optional[str]
    vehicle_type: Optional[str]
    nickname: Optional[str]
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class VehicleListResponse(BaseModel):
    data: List[VehicleResponse]