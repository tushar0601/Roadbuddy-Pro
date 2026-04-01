from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.domain.notification.schema import (
    NotificationResponse,
    NotificationReadResponse,
)
from app.domain.notification.service import NotificationService

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=list[NotificationResponse])
def get_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = NotificationService(db)
    notifications = service.list_notifications(current_user)

    return [
        NotificationResponse(
            id=str(notification.id),
            type=notification.type,
            title=notification.title,
            body=notification.body,
            is_read=notification.is_read,
            created_at=notification.created_at,
            read_at=notification.read_at,
        )
        for notification in notifications
    ]


@router.post("/{notification_id}/read", response_model=NotificationReadResponse)
def mark_notification_as_read(
    notification_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = NotificationService(db)
    notification = service.mark_as_read(notification_id, current_user)

    return NotificationReadResponse(
        id=str(notification.id),
        is_read=notification.is_read,
        read_at=notification.read_at,
        message="Notification marked as read",
    )