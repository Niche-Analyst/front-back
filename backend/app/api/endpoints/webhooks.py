from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services import user_service
from app.schemas import user as user_schema

router = APIRouter()

# API가 호출될 때마다 DB 세션을 생성하고, 끝나면 닫아주는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/new-user", response_model=user_schema.User)
async def handle_new_user_webhook(request: Request, db: Session = Depends(get_db)):
    """Supabase로부터 신규 사용자 정보를 받아 MariaDB에 저장합니다."""
    payload = await request.json()

    if payload.get("type") != "INSERT" or "record" not in payload:
        raise HTTPException(status_code=400, detail="Invalid Supabase payload")

    new_user_data = payload["record"]
    supabase_user_id = new_user_data.get("id")

    if not supabase_user_id:
        raise HTTPException(status_code=400, detail="User ID not found")

    # 이미 존재하는 사용자인지 확인
    if user_service.get_user_by_supabase_id(db, supabase_user_id=supabase_user_id):
        raise HTTPException(status_code=409, detail="User already exists")

    # user_service를 통해 사용자 생성
    user_to_create = user_schema.UserCreate(**new_user_data)
    created_user = user_service.create_user(db=db, user=user_to_create)
    return created_user