import uuid
from sqlalchemy import String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.enums.vehicle import VehicleType


class Vehicle(Base):
    __tablename__ = "vehicle"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("app_user.id", ondelete="CASCADE"),
        nullable=False,
    )
    nickname: Mapped[str | None] = mapped_column(String(100), nullable=True)
    plate_last_4: Mapped[str | None] = mapped_column(
        String(4), nullable=True, index=True
    )
    plate_hash: Mapped[str | None] = mapped_column(
        String(255), nullable=True, unique=True
    )
    vehicle_type: Mapped[VehicleType | None] = mapped_column(String(50), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    owner = relationship("AppUser", back_populates="vehicles")
    stickers = relationship("Sticker", back_populates="vehicle")
    notifications = relationship("Notification", back_populates="vehicle")
    sticker_activations = relationship("StickerActivation", back_populates="vehicle")
