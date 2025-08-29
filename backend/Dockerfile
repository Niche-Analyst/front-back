# 1. 베이스 이미지 선택 (가볍고 안정적인 Python 이미지)
FROM python:3.13-slim-bookworm

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. <<-- 수정된 부분 시작 -->>
#    MariaDB Connector/C 와 컴파일 도구를 설치합니다.
RUN apt-get update && apt-get install -y \
  gcc \
  libmariadb-dev \
  && rm -rf /var/lib/apt/lists/*
# <<-- 수정된 부분 끝 -->>

# 4. 의존성 파일 복사 및 설치 (빌드 캐시 활용을 위해 먼저 실행)
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# 5. 소스 코드 복사
COPY . /app

# 6. 컨테이너 외부 노출 포트 지정
EXPOSE 8000

# 7. Uvicorn 개발 서버 실행 (코드 변경 시 자동 재시작)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]