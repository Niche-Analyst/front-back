from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine
from app.api.endpoints import webhooks

# SQLAlchemy가 models.py를 보고 DB에 테이블이 없으면 생성해줍니다.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ORB AI Backend API",
    description="Supabase 인증과 연동되는 FastAPI 백엔드 서버입니다.",
    version="0.1.0"
)

# webhooks.py에 정의된 모든 API 경로를 우리 앱에 공식적으로 등록합니다.
app.include_router(webhooks.router, prefix="/api/v1/webhooks", tags=["Webhooks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the ORB AI Backend!"}