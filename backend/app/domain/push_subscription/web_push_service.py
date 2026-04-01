import json
from typing import Any

from pywebpush import WebPushException, webpush
from sqlalchemy.orm import Session

from app.core.config import settings
from app.domain.push_subscription.model import PushSubscription
from app.domain.push_subscription.repository import PushSubscriptionRepository


class WebPushService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = PushSubscriptionRepository(db)

    def _build_subscription_info(
        self, subscription: PushSubscription
    ) -> dict[str, Any]:
        return {
            "endpoint": subscription.endpoint,
            "keys": {
                "p256dh": subscription.p256dh,
                "auth": subscription.auth,
            },
        }

    def send_to_subscription(
        self,
        subscription: PushSubscription,
        payload: dict[str, Any],
    ) -> bool:
        try:
            webpush(
                subscription_info=self._build_subscription_info(subscription),
                data=json.dumps(payload),
                vapid_private_key=settings.VAPID_PRIVATE_KEY,
                vapid_claims={
                    "sub": settings.VAPID_SUBJECT,
                },
                ttl=settings.WEB_PUSH_TTL_SECONDS,
            )
            return True

        except WebPushException as exc:
            status_code = None
            response = getattr(exc, "response", None)
            if response is not None:
                status_code = getattr(response, "status_code", None)

            # Endpoint gone / invalid / unsubscribed
            if status_code in (404, 410):
                self.repo.deactivate(subscription)
                self.db.commit()
                return False

            # Other push failures: keep subscription for now
            return False

    def send_to_user(
        self,
        user_id,
        payload: dict[str, Any],
    ) -> dict[str, int]:
        subscriptions = self.repo.get_active_by_user_id(user_id)

        sent = 0
        failed = 0

        for subscription in subscriptions:
            ok = self.send_to_subscription(subscription, payload)
            if ok:
                sent += 1
            else:
                failed += 1

        return {
            "sent": sent,
            "failed": failed,
        }