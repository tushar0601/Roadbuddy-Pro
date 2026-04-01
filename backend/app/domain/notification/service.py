from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.domain.notification.repository import NotificationRepository


class NotificationService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = NotificationRepository(db)

    def list_notifications(self, current_user):
        return self.repo.get_by_user_id(current_user.id)

    def mark_as_read(self, notification_id, current_user):
        notification = self.repo.get_by_id_and_user_id(notification_id, current_user.id)

        if not notification:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found",
            )

        if not notification.is_read:
            self.repo.mark_as_read(notification)
            self.db.commit()
            self.db.refresh(notification)

        return notification