from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.domain.notification.model import Notification


class NotificationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id,
        vehicle_id,
        ping_event_id,
        type,
        title: str,
        body: str | None,
    ) -> Notification:
        notification = Notification(
            user_id=user_id,
            vehicle_id=vehicle_id,
            ping_event_id=ping_event_id,
            type=type,
            title=title,
            body=body,
            is_read=False,
        )
        self.db.add(notification)
        self.db.flush()
        return notification

    def get_by_user_id(self, user_id):
        return (
            self.db.query(Notification)
            .filter(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
            .all()
        )

    def get_by_id_and_user_id(self, notification_id, user_id):
        return (
            self.db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_id == user_id,
            )
            .first()
        )

    def mark_as_read(self, notification: Notification) -> Notification:
        notification.is_read = True
        notification.read_at = datetime.now(timezone.utc)
        self.db.flush()
        return notification