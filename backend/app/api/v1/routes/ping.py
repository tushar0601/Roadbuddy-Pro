from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.domain.ping_event.schema import PingCreateRequest, PingCreateResponse
from app.domain.ping_event.service import PingEventService

router = APIRouter(prefix="/ping", tags=["ping"])


@router.post("/{public_code}", response_model=PingCreateResponse, status_code=status.HTTP_201_CREATED)
def create_ping(
    public_code: str,
    payload: PingCreateRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    service = PingEventService(db)
    ping_event = service.create_ping(
        public_code=public_code,
        reason=payload.reason,
        note=payload.note,
        request=request,
    )

    return PingCreateResponse(
        ping_event_id=str(ping_event.id),
        message="Ping sent successfully",
        created_at=ping_event.created_at,
    )