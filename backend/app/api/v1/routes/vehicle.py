from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.domain.vehicle.schema import VehicleRegisterRequest, VehicleRegisterResponse, VehicleResponse
from app.domain.vehicle.service import VehicleService
from app.domain.user.model import AppUser

router = APIRouter(prefix="/vehicle", tags=["vehicle"])


@router.post("/register", response_model=VehicleRegisterResponse)
def register_vehicle(
    payload: VehicleRegisterRequest,
    db: Session = Depends(get_db),
    current_user: AppUser =Depends(get_current_user),
):
    service = VehicleService(db)
    vehicle, sticker = service.register_vehicle(
        current_user=current_user,
        sticker_code=payload.sticker_code,
        plate_no=payload.plate_no,
    )
    return VehicleRegisterResponse(
        vehicle_id=str(vehicle.id),
        sticker_code=sticker.public_code,
        status=sticker.status,
    )

@router.get("/",response_model=List[VehicleResponse])
def get_all_vehicles(
    db: Session = Depends(get_db),
    current_user: AppUser = Depends(get_current_user)
):
    service = VehicleService(db)
    return service.get_vehicles_by_owner(owner_id=current_user.id)
