from sqlalchemy.orm import Session
from app.db import models
from app.schemas import user as user_schema

def get_user_by_supabase_id(db: Session, supabase_user_id: str):
    return db.query(models.User).filter(models.User.supabase_user_id == supabase_user_id).first()

def create_user(db: Session, user: user_schema.UserCreate):
    """
    UserCreate 양식에 맞춰 받은 데이터로 MariaDB에 새로운 사용자를 생성합니다.
    """
    db_user = models.User(
        supabase_user_id=user.supabase_user_id,
        email=user.email,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user