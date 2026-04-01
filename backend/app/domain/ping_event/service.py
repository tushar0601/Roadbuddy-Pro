import hashlib
from fastapi import HTTPException, Request, status
from sqlalchemy.orm import Session

from app.domain.sticker.repository import StickerRepository
from app.domain.ping_event.repository import PingEventRepository
from app.domain.notification.repository import NotificationRepository
from app.enums.notification import NotificationType
from app.enums.sticker import StickerStatus
from app.domain.push_subscription.web_push_service import WebPushService

class PingEventService:
    def __init__(self, db: Session):
        self.db = db
        self.sticker_repo = StickerRepository(db)
        self.ping_repo = PingEventRepository(db)
        self.notification_repo = NotificationRepository(db)

    def _hash_ip(self, ip_address: str | None) -> str | None:
        if not ip_address:
            return None
        return hashlib.sha256(ip_address.encode("utf-8")).hexdigest()

    def create_ping(
        self,
        public_code: str,
        reason: str | None,
        note: str | None,
        request: Request,
    ):
        sticker = self.sticker_repo.get_by_public_code(public_code)

        if not sticker:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sticker not found",
            )

        if sticker.status != StickerStatus.ACTIVE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sticker is not active",
            )

        if not sticker.vehicle:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sticker is not linked to a vehicle",
            )

        owner = sticker.vehicle.owner
        if not owner:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vehicle owner not found",
            )

        client_ip = request.client.host if request.client else None
        source_ip_hash = self._hash_ip(client_ip)
        user_agent = request.headers.get("user-agent")
        page_path = str(request.url.path)

        ping_event = self.ping_repo.create(
            sticker_id=sticker.id,
            reason=reason,
            note=note,
            source_ip_hash=source_ip_hash,
            user_agent=user_agent,
            page_path=page_path,
            country_code=None,
        )

        title = "Someone pinged your vehicle"
        body_parts = []

        if reason:
            body_parts.append(f"Reason: {reason}")
        if note:
            body_parts.append(f"Note: {note}")

        body = " | ".join(body_parts) if body_parts else "A new vehicle ping was received."

        notification = self.notification_repo.create(
            user_id=owner.id,
            vehicle_id=sticker.vehicle.id,
            ping_event_id=ping_event.id,
            type=NotificationType.VEHICLE_PING,
            title=title,
            body=body,
        )

        self.db.commit()
        self.db.refresh(ping_event)
        self.db.refresh(notification)

        push_payload = {
            "title": title,
            "body": body,
            "icon": "/icons/icon-192x192.png",
            "badge": "/icons/icon-192x192.png",
            "url": "/dashboard",
        }

        web_push_service = WebPushService(self.db)
        web_push_service.send_to_user(owner.id, push_payload)
        return ping_event