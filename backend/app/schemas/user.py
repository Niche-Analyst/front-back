from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    supabase_user_id: str
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

class User(BaseModel):
    id: int
    supabase_user_id: str
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    created_at: datetime

    class Config:
        # [수정됨] orm_mode -> from_attributes 로 변경
        from_attributes = True