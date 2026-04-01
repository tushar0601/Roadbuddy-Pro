from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import base_models  # noqa: F401
from app.api.v1.router import api_router

app = FastAPI(title="RoadBuddy API")


origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],            
)

app.include_router(api_router, prefix="/api/v1")