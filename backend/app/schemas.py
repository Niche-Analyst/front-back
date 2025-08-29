from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class UserCreate(UserBase):
    supabase_user_id: str

class User(UserBase):
    id: int
    supabase_user_id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserActivityBase(BaseModel):
    activity_type: str
    activity_data: Optional[str] = None

class UserActivityCreate(UserActivityBase):
    pass

class UserActivity(UserActivityBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
