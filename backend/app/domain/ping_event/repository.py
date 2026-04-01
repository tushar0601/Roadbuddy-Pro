from sqlalchemy.orm import Session
from app.domain.ping_event.model import PingEvent


class PingEventRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        sticker_id,
        reason: str | None,
        note: str | None,
        source_ip_hash: str | None,
        user_agent: str | None,
        page_path: str | None,
        country_code: str | None = None,
    ) -> PingEvent:
        ping_event = PingEvent(
            sticker_id=sticker_id,
            reason=reason,
            note=note,
            source_ip_hash=source_ip_hash,
            user_agent=user_agent,
            page_path=page_path,
            country_code=country_code,
        )
        self.db.add(ping_event)
        self.db.flush()
        return ping_event