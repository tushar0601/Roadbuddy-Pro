from sqlalchemy.orm import Session
from typing import List
from app.domain.vehicle.model import Vehicle
import uuid

class VehicleRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, owner_id: uuid.UUID, plate_last_4: str, plate_hash: str | None = None) -> Vehicle:
        vehicle = Vehicle(
            owner_id=owner_id,
            plate_last_4=plate_last_4,
            plate_hash=plate_hash,
            is_active=True,
        )
        self.db.add(vehicle)
        self.db.flush()
        return vehicle
    
    def get_vehicle_by_user(self, owner_id:uuid.UUID) -> List[Vehicle]:
        return self.db.query(Vehicle).filter(Vehicle.owner_id == owner_id).all()