from uuid import UUID
from sqlalchemy.orm import Session
from typing import List

from app.domain.push_subscription.repository import PushSubscriptionRepository
from app.domain.push_subscription.model import PushSubscription

from app.domain.push_subscription.schema import PushSubscriptionCreateSchema


class PushSubscriptionService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = PushSubscriptionRepository(db)

    def create_or_update_subscription(
        self,
        user_id: UUID,
        payload: PushSubscriptionCreateSchema,
    ) -> tuple[PushSubscription, str, bool]:
        existing = self.repo.get_by_user_and_endpoint(
            user_id=user_id,
            endpoint=payload.endpoint,
        )

        if existing:
            existing.p256dh = payload.keys.p256dh
            existing.auth = payload.keys.auth
            existing.is_active = True

            self.db.commit()
            self.db.refresh(existing)
            return existing, "Push subscription updated successfully", False

        subscription = self.repo.create(
            user_id=user_id,
            endpoint=payload.endpoint,
            p256dh=payload.keys.p256dh,
            auth=payload.keys.auth,
        )
        self.db.commit()
        self.db.refresh(subscription)
        return subscription, "Push subscription created successfully", True