# PPL-Analytics: 데이터 기반 PPL 마케팅 성과 분석 서비스

**"데이터로 증명하는 PPL의 힘, 당신의 마케팅을 Analytics로 업그레이드하다."**

<br/>

![image](https://github.com/user-attachments/assets/f0a1e527-1157-42fa-9633-95a859157474)

<br/>

## 1. 프로젝트 개요

[cite_start]**PPL-Analytics**는 감정적 판단과 추측에 의존하던 기존의 광고 성과 측정 방식을 **데이터 기반의 정량적 분석 체계로 혁신**하는 서비스입니다[cite: 6]. [cite_start]실제 시청자 행동 데이터와 AI 분석을 통해 광고주가 보다 전략적이고 객관적인 의사결정을 내릴 수 있도록 지원하며 [cite: 7][cite_start], AI 기반 자동 리포트 생성으로 **분석 시간을 80% 단축**시키는 것을 목표로 합니다[cite: 10].

### 핵심 가치 (Core Value)
* [cite_start]**데이터 투명성**: 실제 시청자 반응 데이터에 기반한 객관적인 PPL 성과를 분석합니다[cite: 9].
* [cite_start]**효율성 극대화**: AI가 자동으로 리포트를 생성하여 분석 시간을 획기적으로 단축합니다[cite: 10].
* [cite_start]**경쟁 인텔리전스**: 동종 업계 벤치마크와 비교하여 상대적 성과를 평가합니다[cite: 11].
* [cite_start]**시각화 중심**: 직관적인 차트와 인포그래픽으로 즉시 이해 가능한 인사이트를 제공합니다[cite: 12].
* [cite_start]**전략적 방향성**: 단순한 성과 리포팅을 넘어 차세대 마케팅 전략을 제안합니다[cite: 13].

<br/>

---

## 📋 요구사항 정의서 (Requirements Definition)

<details>
  <summary> ✅ 기능 요구사항 (Functional Requirements) </summary>
  <br/>

  ### 🔹 2.1.1 사용자 인증 및 권한 관리
  * [cite_start]**소셜 로그인**: Supabase Auth 기반의 Google OAuth 2.0 연동을 통한 무마찰 인증 [cite: 20, 21]
  * [cite_start]**세션 관리**: JWT 토큰 기반 세션 관리 및 자동 갱신 [cite: 22]
  * [cite_start]**권한 분리**: 역할 기반 접근 제어(RBAC) - 관리자/일반 사용자/게스트 [cite: 23]

  ### 🔹 2.1.2 데이터 입력 및 파일 관리
  * [cite_start]**스마트 카테고리 분류**: 화장품, 식품, 패션 등 10개 주요 업종 분류 [cite: 27]
  * [cite_start]**동적 입력 필드**: 선택된 카테고리별 맞춤형 추가 정보 수집 [cite: 28]
  * [cite_start]**멀티 포맷 지원**: PDF, DOCX, XLSX, CSV 파일 업로드 [cite: 32]
  * [cite_start]**보안 저장**: AWS S3를 통한 암호화 저장, 버전 관리, 백업 정책 적용 [cite: 33]

  ### 🔹 2.1.3 다차원 데이터 수집 및 전처리
  * [cite_start]**시청자 행동 데이터 분석**: 실시간 시청 패턴, 인구통계, 디지털 성향, 시청 환경 분석 [cite: 35, 36, 37, 38, 39]
  * [cite_start]**PPL 성과 데이터 통합**: 방송사, 소셜미디어, 검색 트렌드 데이터 연동 [cite: 41]
  * [cite_start]**데이터 품질 관리**: 이상치 탐지, 머신러닝 기반 결측값 처리, 데이터 정규화 [cite: 44, 45, 46, 47]

  ### 🔹 2.1.4 AI 기반 보고서 생성
  * [cite_start]**프롬프트 오케스트레이션**: 카테고리별 전문화된 프롬프트를 사용하여 분석 정확도 향상 [cite: 49, 50]
  * [cite_start]**AI 모델 이중 구조**: 빠른 처리를 위한 `Gemini-2.5-flash-lite`와 심층 분석을 위한 `Skywork API` 활용 [cite: 55, 56, 60]
  * [cite_start]**8단계 보고서 생성 파이프라인**: 요약부터 향후 계획까지 체계적인 보고서 자동 생성 [cite: 64, 65, 66, 67, 68, 69, 70, 71, 72]

  ### 🔹 2.1.5 인터랙티브 대시보드 및 시각화
  * [cite_start]**실시간 성과 모니터링**: KPI 대시보드, 드릴다운 분석, 다차원 비교 뷰, 미래 성과 예측 [cite: 74, 75, 76, 77, 78]
  * [cite_start]**고급 시각화 기능**: D3.js 기반 동적 차트, 히트맵, 워드클라우드, 트렌드라인 [cite: 79, 80, 81, 82, 83]

  ### 🔹 2.1.6 고급 내보내기 및 공유
  * [cite_start]**다중 포맷 지원**: PDF, PowerPoint, Excel 포맷으로 리포트 자동 생성 [cite: 85, 86, 87, 88]
  * [cite_start]**웹 링크 공유**: 실시간 업데이트가 반영되는 웹 기반 리포트 공유 [cite: 89]

  ### 🔹 2.1.7 API 및 시스템 통합
  * [cite_start]**RESTful API 설계**: 인증(`auth`), 대시보드(`dashboard`), 분석(`analysis`), 리포트(`report`) API 제공 [cite: 91, 92, 93, 94, 95]
  * [cite_start]**외부 시스템 연동**: 방송사, 소셜미디어, 검색 트렌드, 광고 플랫폼 API 연동 [cite: 96, 97, 98, 99, 100]
</details>

<details>
  <summary> ✅ 비기능 요구사항 (Non-functional Requirements) </summary>
  <br/>

  ### 🔹 2.2.1 보안 및 컴플라이언스
  * [cite_start]**데이터 보호**: AES-256 저장 암호화, TLS 1.3 전송 암호화 적용 [cite: 104]
  * [cite_start]**데이터 거버넌스**: 데이터 생명주기 관리 및 자동 삭제 정책 수립 [cite: 105]
  * [cite_start]**접근 제어**: 최소 권한 원칙(Principle of least privilege) 적용 [cite: 106]
  
  ### 🔹 2.2.2 성능 및 확장성
  * **성능 목표**
    * [cite_start]**API 응답 시간**: 3초 이내 [cite: 109]
    * [cite_start]**리포트 생성**: 5분 이내 완료 (복잡 분석 시 10분 이내) [cite: 110]
</details>

<br/>

---

## 🤖 AI 아키텍처 및 리포트 생성 파이프라인

본 서비스는 **이중 AI 모델(Dual AI Model)** 과 **카테고리별 프롬프트 오케스트레이션**을 통해 분석의 속도와 깊이를 모두 확보합니다.

### 🔹 이중 AI 모델 전략

| 모델 | 역할 | 처리 시간 | 특징 |
| :--- | :--- | :--- | :--- |
| **1️⃣ Gemini-2.5-flash-lite** | [cite_start]원시 데이터 구조화, 초기 인사이트 추출, 프롬프트 전처리 [cite: 206] | [cite_start]**30초** [cite: 210] | [cite_start]빠른 속도와 비용 효율성 최적화 [cite: 211] |
| **2️⃣ Skywork API** | [cite_start]다중 에이전트를 활용한 심층 전략 분석 및 최종 보고서 생성 [cite: 213] | [cite_start]**10-15분** [cite: 217] | [cite_start]다중 에이전트 검증을 통한 고품질 분석 및 권고사항 도출 [cite: 63] |

<br/>

---

## 🏗️ 시스템 아키텍처 및 데이터 모델

### 🔹 데이터베이스 스키마
서비스의 데이터는 분석 목적에 따라 체계적으로 설계된 5개의 핵심 테이블로 관리됩니다.

* [cite_start]**`fact_ppl_campaign`**: 캠페인별 성과, 비용, ROI 등 29개 핵심 지표를 관리하는 팩트 테이블 [cite: 113, 114]
* [cite_start]**`iptv_user_profile`**: 시청자의 인구통계학적 정보와 디지털 행동 특성을 관리하는 프로필 테이블 [cite: 149]
* [cite_start]**`drama_program_metadata`**: 프로그램별 상세 시청률 메타데이터 [cite: 166]
* [cite_start]**`industry_benchmark`**: 업종별 경쟁 분석의 기준이 되는 벤치마크 데이터 테이블 [cite: 183]
* [cite_start]**`ppl_performance_history`**: 시계열 분석 및 트렌드 예측을 위한 과거 PPL 성과 이력 테이블 [cite: 191]

<br/>

---

## 🛠️ 기술 스택 (Tech Stack)

| 영역 | 기술 스택 | 버전 | 선택 근거 |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 19.1 | 최신 Concurrent Features, Suspense 최적화 |
| | Next.js | 15.4 | App Router, Server Components, 향상된 SSR |
| | Tailwind CSS | 4.1 | 유틸리티 우선 CSS, 일관된 디자인 시스템 |
| | React Query | 5.3 | 서버 상태 관리, 캐싱 최적화 |
| **Backend** | FastAPI | 0.116 | 높은 성능, 자동 API 문서, 타입 힌팅 |
| | Python | 3.11 | 최신 성능 개선, 타입 힌팅 강화 |
| | Pydantic | 2.11 | 데이터 검증, 직렬화, FastAPI 완전 통합 |
| | SQLAlchemy | 2.0+ | 비동기 ORM, 성능 최적화 |
| **Database** | MariaDB | Latest | AWS RDS, 관리형 서비스, 확장성 |
| **Cloud & Storage** | AWS S3 | - | 파일 저장, CDN 연동, 보안 |
| | AWS RDS | - | 관리형 데이터베이스, 백업/복구 |
| | AWS CloudFront | - | CDN, 글로벌 배송 최적화 |
| **Authentication** | Supabase Auth | 2.56 | 소셜 로그인, JWT, 사용자 관리 |
| **AI/ML** | Gemini-2.5-flash-lite | Latest | 빠른 데이터 전처리, 비용 최적화 |
| | Skywork API | Latest | 고품질 보고서 생성, 에이전트 AI |
| | Xgboost | 3.0.4 | 머신러닝 |
| | Scikit-learn | 1.71 | 머신러닝 |
| **Data Visualization**| Matplotlib | 3.10 | 정적 차트 생성 |
| **Development** | TypeScript | 5.0+ | 타입 안전성, 개발 효율성 |
| | Eslint | 3+ | 코드 스타일 일관성 유지, 오류 방지 |

<br/>

---
## 🎯 프로젝트 목표 및 성공 지표

### 🔹 기술적 목표
* [cite_start]**API 응답 시간**: 모든 API 엔드포인트에서 **3초 이내**의 응답 속도를 목표로 합니다[cite: 240].
* [cite_start]**리포트 생성 시간**: 복잡한 분석을 포함하여 **10분 이내**에 최종 보고서 생성을 완료합니다[cite: 240].
* **시스템 가용성**: 월별 **99.9% 이상**의 시스템 가용성을 유지합니다.

### 🔹 비즈니스 목표
* [cite_start]**분석 시간 단축**: 기존 2-3주 소요되던 수작업 분석을 **5~10분** 내외의 자동 리포트로 대체하여 분석 효율을 **99%** 개선합니다[cite: 256].
* [cite_start]**의사결정 정확도 향상**: 데이터 기반의 객관적 분석을 통해 PPL 캠페인 성과 예측 정확도를 **80% 이상**으로 높입니다[cite: 256].
* [cite_start]**ROI 개선**: 실시간 성과 추적 및 최적화 제안을 통해 광고주의 ROI를 **30% 이상** 개선하는 것을 목표로 합니다[cite: 256].
