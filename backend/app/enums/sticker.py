import enum


class StickerStatus(str, enum.Enum):
    UNCLAIMED = "UNCLAIMED"
    ACTIVE = "ACTIVE"
    REVOKED = "REVOKED"
    LOST = "LOST"
    DISABLED = "DISABLED"