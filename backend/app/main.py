# backend/app/main.py

from fastapi import FastAPI
from .routers import webhooks
from . import models
from .database import engine


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(webhooks.router, prefix="/api/v1/webhooks", tags=["Webhooks"])

# 서버가 잘 작동하는지 확인할 수 있는 기본 경로입니다.
@app.get("/")
def read_root():
    return {"message": "Welcome to the ORB AI Backend API"}