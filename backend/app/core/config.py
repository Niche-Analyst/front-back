import os
from dotenv import load_dotenv

# .env 파일의 내용을 환경변수로 로드합니다.
load_dotenv()

class Settings:
    """애플리케이션 설정을 관리하는 클래스"""
    # 데이터베이스 접속 정보
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT")
    DB_NAME: str = os.getenv("DB_NAME")

    # SQLAlchemy가 MariaDB에 연결할 때 사용할 주소(URL)를 조합합니다.
    DATABASE_URL = f"mariadb+mariadbconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# settings 객체를 생성하여 다른 파일에서 불러와 사용할 수 있도록 합니다.
settings = Settings()