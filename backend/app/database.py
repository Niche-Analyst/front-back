# backend/app/database.py

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


SQLALCHEMY_DATABASE_URL = f"mariadb+mariadbconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SQLAlchemy 엔진 생성
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 데이터베이스 세션 생성을 위한 클래스
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 모델 클래스들이 상속받을 기본 클래스
Base = declarative_base()