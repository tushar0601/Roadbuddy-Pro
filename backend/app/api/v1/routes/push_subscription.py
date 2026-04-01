from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.domain.push_subscription.schema import (PushSubscriptionCreateSchema, PushSubscriptionResponseSchema)
from app.domain.push_subscription.service import PushSubscriptionService
from app.api.deps import get_db, get_current_user
from app.domain.user.model import AppUser

router = APIRouter(prefix="/push-subscriptions", tags=["Push Subscriptions"])


@router.post(
    "/",
    response_model=PushSubscriptionResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
def create_push_subscription(
    payload: PushSubscriptionCreateSchema,
    db: Session = Depends(get_db),
    current_user: AppUser = Depends(get_current_user),
):
    service = PushSubscriptionService(db)

    subscription, message = service.create_or_update_subscription(
        user_id=current_user.id,
        payload=payload,
    )

    return PushSubscriptionResponseSchema(
        id=str(subscription.id),
        endpoint=subscription.endpoint,
        p256dh=subscription.p256dh,
        auth=subscription.auth,
        is_active=subscription.is_active,
        created_at=subscription.created_at,
        updated_at=subscription.updated_at,
        message=message,
    )