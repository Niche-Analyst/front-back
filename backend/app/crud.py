# backend/app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas


def get_user_by_supabase_id(db: Session, supabase_user_id: str):
    """Supabase UUID를 사용하여 사용자를 조회합니다."""
    return db.query(models.User).filter(models.User.supabase_user_id == supabase_user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    """새로운 사용자를 생성합니다."""
    db_user = models.User(
        supabase_user_id=user.supabase_user_id,
        email=user.email,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user) 
    return db_user


def create_user_activity(db: Session, activity: schemas.UserActivityCreate, user_id: int):
    """새로운 사용자 활동을 생성합니다."""
    db_activity = models.UserActivity(
        **activity.model_dump(),
        user_id=user_id
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity