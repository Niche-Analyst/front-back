# 1. 베이스 이미지 선택 (경량화된 Node.js 이미지)
FROM node:20-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 (빌드 캐시 활용)
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. 컨테이너 외부 노출 포트 지정
EXPOSE 3000

# 7. Next.js 개발 서버 실행
CMD ["npm", "run", "dev"]