# PPL-Analytics: 데이터 기반 PPL 마케팅 성과 분석 서비스

> 데이터로 증명하는 PPL의 힘, 당신의 마케팅을 Analytics로 업그레이드하다.

<br/>

## 1. 프로젝트 개요

[cite_start]**PPL-Analytics**는 감정적 판단과 추측에 의존하던 기존의 광고 성과 측정 방식을 **데이터 기반의 정량적 분석 체계로 혁신**하는 서비스입니다[cite: 6].

[cite_start]실제 시청자 행동 데이터와 AI 분석을 통해 광고주가 보다 전략적이고 객관적인 의사결정을 내릴 수 있도록 지원하며 [cite: 7][cite_start], AI 기반 자동 리포트 생성으로 분석 시간을 80% 단축시키는 것을 목표로 합니다[cite: 10].

<br/>

---

## 요구사항 정의서

<details>
  <summary> ✅ 기능 요구사항 자세히 보기 </summary>
  
### **사용자 인증 및 권한 관리**
- [cite_start]Supabase Auth 기반 소셜 로그인 (Google OAuth 2.0) [cite: 20, 21]
- [cite_start]JWT 토큰 기반 세션 관리 및 자동 갱신 [cite: 22]
- [cite_start]역할 기반 접근 제어(RBAC): 관리자/일반 사용자/게스트 권한 분리 [cite: 23]

### **데이터 입력 및 파일 관리**
- **제품 정보 수집 폼**
  - [cite_start]스마트 카테고리 분류 (화장품, 식품, 패션 등 10개 업종) [cite: 27]
  - [cite_start]캠페인 기간 설정 및 벤치마크 경쟁사 지정 기능 [cite: 29, 30]
- **파일 처리 기능**
  - [cite_start]멀티 포맷 지원 (PDF, DOCX, XLSX, CSV) [cite: 32]
  - [cite_start]AWS S3를 통한 암호화된 파일 저장, 버전 관리 및 백업 [cite: 33]

### **다차원 데이터 수집 및 전처리**
- [cite_start]실시간 시청 패턴, 인구통계, 디지털 성향 등 심층적인 시청자 행동 데이터 분석 [cite: 36, 37, 38, 39]
- [cite_start]방송사, 소셜미디어, 검색 트렌드 등 다중 소스 데이터 통합 및 연동 [cite: 41]
- [cite_start]AI 기반 데이터 품질 관리 (이상치 탐지, 결측값 처리, 정규화) [cite: 45, 46, 47]

### **AI 기반 보고서 생성**
- **이중 AI 모델 구조**
  - [cite_start]**1차 (Gemini-2.5-flash-lite):** 원시 데이터 구조화 및 초기 인사이트 추출 [cite: 56, 57]
  - [cite_start]**2차 (Skywork API):** 다중 에이전트를 활용한 심층 전략 분석 및 최종 보고서 생성 [cite: 60, 61, 63]
- [cite_start]**카테고리별 전문화 프롬프트**를 통한 맞춤형 분석 (화장품, 식품, 패션, 전자제품) [cite: 50]
- [cite_start]Executive Summary, 시장 분석, ROI 분석 등을 포함한 **8단계 보고서 파이프라인** [cite: 64, 65, 66, 67, 68, 69, 70, 71, 72]

### **인터랙티브 대시보드 및 시각화**
- [cite_start]실시간 KPI 대시보드 및 드릴다운 분석 기능 [cite: 75, 76]
- [cite_start]D3.js 기반 동적 차트, 히트맵, 워드클라우드 등 고급 시각화 [cite: 80, 81, 82]
- [cite_start]트렌드 기반 미래 성과 예측 모델링 [cite: 78]

### **고급 내보내기 및 공유**
- [cite_start]PDF, PowerPoint, Excel 등 다중 포맷 리포트 자동 생성 [cite: 86, 87, 88]
- [cite_start]실시간 업데이트가 반영되는 웹 링크 공유 기능 [cite: 89]

</details>

<details>
  <summary> ✅ 비기능 요구사항 자세히 보기 </summary>
  
- [cite_start]**보안**: AES-256 저장 암호화 및 TLS 1.3 전송 암호화 적용 [cite: 104]
- [cite_start]**성능**: API 3초 이내 응답, 리포트 5~10분 이내 생성 목표 [cite: 109, 110]

</details>

<br/>

---

## WBS (Work Breakdown Structure)
<details>
  <summary> ☑️ WBS 전체 일정 보러가기 </summary>
  <br/>
  <a href="<WBS_엑셀파일_링크>" target="_blank"> 📂 WBS_일정.xlsx </a>
</details>

<br/>

---

## 기술 스택 (Tech Stack)

| 영역 | 기술 스택 | 버전 | 선택 근거 |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 19.1 | [cite_start]최신 Concurrent Features, Suspense 최적화 [cite: 233] |
| | Next.js | 15.4 | [cite_start]App Router, Server Components, 향상된 SSR [cite: 233] |
| | Tailwind CSS | 4.1 | [cite_start]유틸리티 우선 CSS, 일관된 디자인 시스템 [cite: 233] |
| **Backend** | FastAPI | 0.116 | [cite_start]높은 성능, 자동 API 문서, 타입 힌팅 [cite: 233] |
| | Python | 3.11 | [cite_start]최신 성능 개선, 타입 힌팅 강화 [cite: 233] |
| **Database** | MariaDB | Latest | [cite_start]AWS RDS, 관리형 서비스, 확장성 [cite: 233] |
| | SQLAlchemy | 2.0+ | [cite_start]비동기 ORM, 성능 최적화 [cite: 233] |
| **Cloud** | AWS S3, RDS | - | [cite_start]파일 저장 및 관리형 데이터베이스 [cite: 233] |
| **Auth** | Supabase Auth | 2.56 | [cite_start]소셜 로그인, JWT, 사용자 관리 [cite: 233] |
| **AI/ML** | Gemini-2.5-flash-lite | Latest | [cite_start]빠른 데이터 전처리, 비용 최적화 [cite: 233] |
| | Skywork API | Latest | [cite_start]고품질 보고서 생성, 에이전트 AI [cite: 233] |
