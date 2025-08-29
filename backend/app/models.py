# backend/app/models.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"  # 실제 데이터베이스 테이블 이름

    id = Column(Integer, primary_key=True, index=True)
    supabase_user_id = Column(String(36), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, index=True)
    full_name = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    
    activities = relationship("UserActivity", back_populates="owner")


class UserActivity(Base):
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # 
    activity_type = Column(String(50), nullable=False)
    activity_data = Column(Text) 
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="activities")