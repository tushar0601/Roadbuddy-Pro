from uuid import UUID
from sqlalchemy.orm import Session

from app.domain.push_subscription.model import PushSubscription


class PushSubscriptionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_user_and_endpoint(
        self, user_id: UUID, endpoint: str
    ) -> PushSubscription | None:
        return (
            self.db.query(PushSubscription)
            .filter(
                PushSubscription.user_id == user_id,
                PushSubscription.endpoint == endpoint,
            )
            .first()
        )

    def get_active_by_user_id(self, user_id: UUID) -> list[PushSubscription]:
        return (
            self.db.query(PushSubscription)
            .filter(
                PushSubscription.user_id == user_id,
                PushSubscription.is_active.is_(True),
            )
            .all()
        )

    def create(
        self,
        user_id: UUID,
        endpoint: str,
        p256dh: str,
        auth: str,
    ) -> PushSubscription:
        subscription = PushSubscription(
            user_id=user_id,
            endpoint=endpoint,
            p256dh=p256dh,
            auth=auth,
            is_active=True,
        )
        self.db.add(subscription)
        self.db.flush()
        return subscription

    def deactivate(self, subscription: PushSubscription) -> PushSubscription:
        subscription.is_active = False
        self.db.flush()
        return subscription