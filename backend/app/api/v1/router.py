from fastapi import APIRouter
from app.api.v1.routes import user, vehicle, sticker, ping, notification, push_subscription

api_router = APIRouter()
api_router.include_router(user.router)
api_router.include_router(vehicle.router)
api_router.include_router(sticker.router)
api_router.include_router(ping.router)
api_router.include_router(notification.router)
api_router.include_router(push_subscription.router)