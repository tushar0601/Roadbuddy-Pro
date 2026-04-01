import uuid
from sqlalchemy import String, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class StickerActivation(Base):
    __tablename__ = "sticker_activation"
    __table_args__ = (
        UniqueConstraint("sticker_id", name="uq_sticker_activation_sticker_id"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    sticker_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("sticker.id", ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("app_user.id", ondelete="CASCADE"),
        nullable=False,
    )
    vehicle_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("vehicle.id", ondelete="CASCADE"), nullable=False
    )
    activated_via: Mapped[str | None] = mapped_column(String(50), nullable=True)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    sticker = relationship("Sticker", back_populates="activation")
    user = relationship("AppUser", back_populates="sticker_activations")
    vehicle = relationship("Vehicle", back_populates="sticker_activations")
