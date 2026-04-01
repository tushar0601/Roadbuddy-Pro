from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.domain.vehicle.repository import VehicleRepository
from app.domain.sticker.repository import StickerRepository
from app.domain.vehicle.schema import VehicleResponse, VehicleListResponse
from app.enums.sticker import StickerStatus
import uuid

class VehicleService:
    def __init__(self, db: Session):
        self.db = db
        self.vehicle_repo = VehicleRepository(db)
        self.sticker_repo = StickerRepository(db)

    def get_vehicles_by_owner(self, owner_id: uuid.UUID) -> List[VehicleResponse]:
        vehicles = self.vehicle_repo.get_vehicle_by_user(owner_id=owner_id)
        return [VehicleResponse.model_validate(vehicle) for vehicle in vehicles]

    def register_vehicle(self, current_user, sticker_code: str, plate_no: str):
        sticker = self.sticker_repo.get_by_public_code(sticker_code)

        if not sticker:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sticker not found",
            )

        if sticker.status != StickerStatus.UNCLAIMED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sticker already claimed or inactive",
            )

        plate_last_4 = plate_no[-4:] if len(plate_no) >= 4 else plate_no

        vehicle = self.vehicle_repo.create(
            owner_id=current_user.id,
            plate_last_4=plate_last_4,
            plate_hash=None,
        )

        now = datetime.now(timezone.utc)
        sticker.vehicle_id = vehicle.id
        sticker.status = StickerStatus.ACTIVE
        sticker.assigned_at = now
        sticker.activated_at = now
        sticker.updated_at = now

        self.db.commit()
        self.db.refresh(vehicle)
        self.db.refresh(sticker)

        return vehicle, sticker