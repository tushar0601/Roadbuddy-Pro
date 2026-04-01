import enum


class VehicleType(str, enum.Enum):
    CAR = "CAR"
    BIKE = "BIKE"
    SCOOTER = "SCOOTER"
    OTHER = "OTHER"