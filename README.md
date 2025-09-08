# PPL-Analytics: 데이터 기반 PPL 마케팅 성과 분석 서비스

**"데이터로 증명하는 PPL의 힘, 당신의 마케팅을 Analytics로 업그레이드하다."**

<br/>

![image](https://github.com/user-attachments/assets/f0a1e527-1157-42fa-9633-95a859157474)

<br/>

<table border="0">
  <tr align="center">
    <td style="border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
      <img src="아이콘_URL_경로" width="100px" alt="박찬"/>
      <br />
      <strong>박찬</strong>
      <br />
      <small>팀장/프론트엔드, PM</small>
      <br />
      <small>전체 일정 관리 및<br/>프론트엔드 개발 총괄</small>
    </td>
    <td style="border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
      <img src="아이콘_URL_경로" width="100px" alt="김명재"/>
      <br />
      <strong>김명재</strong>
      <br />
      <small>데이터 분석/시각화</small>
      <br />
      <small>ROI 지표 설계 및<br/>데이터 시각화 담당</small>
    </td>
    <td style="border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
      <img src="아이콘_URL_경로" width="100px" alt="오요셉"/>
      <br />
      <strong>오요셉</strong>
      <br />
      <small>백엔드</small>
      <br />
      <small>API 및 시스템 아키텍처<br/>설계 구축</small>
    </td>
    <td style="border: 1px solid #ddd; border-radius: 10px; padding: 15px;">
      <img src="아이콘_URL_경로" width="100px" alt="유승환"/>
      <br />
      <strong>유승환</strong>
      <br />
      <small>문서작업</small>
      <br />
      <small>자료 정리 및<br/>최종 문서화 담당</small>
    </td>
    <td style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; border-style: dashed;">
      <img src="아이콘_URL_경로" width="100px" alt="윤준희"/>
      <br />
      <strong>윤준희</strong>
      <br />
      <small>멘토</small>
      <br />
      <small>플로우, UI, 데이터 정제,<br/>Q&A 총괄 지원</small>
    </td>
  </tr>
</table>

<br/>

---

## 1. 프로젝트 개요

**PPL-Analytics**는 감정적 판단과 추측에 의존하던 기존의 광고 성과 측정 방식을 **데이터 기반의 정량적 분석 체계로 혁신**하는 서비스입니다. 실제 시청자 행동 데이터와 AI 분석을 통해 광고주가 보다 전략적이고 객관적인 의사결정을 내릴 수 있도록 지원하며, AI 기반 자동 리포트 생성으로 **분석 시간을 80% 단축**시키는 것을 목표로 합니다.

### 핵심 가치 (Core Value)
* **데이터 투명성**: 실제 시청자 반응 데이터에 기반한 객관적인 PPL 성과를 분석합니다.
* **효율성 극대화**: AI가 자동으로 리포트를 생성하여 분석 시간을 획기적으로 단축합니다.
* **경쟁 인텔리전스**: 동종 업계 벤치마크와 비교하여 상대적 성과를 평가합니다.
* **시각화 중심**: 직관적인 차트와 인포그래픽으로 즉시 이해 가능한 인사이트를 제공합니다.
* **전략적 방향성**: 단순한 성과 리포팅을 넘어 차세대 마케팅 전략을 제안합니다.

<br/>

---

## 📋 요구사항 정의서 (Requirements Definition)

<details>
  <summary> ✅ 기능 요구사항 (Functional Requirements) </summary>
  <br/>

  ### 🔹 2.1.1 사용자 인증 및 권한 관리
  * **소셜 로그인**: Supabase Auth 기반의 Google OAuth 2.0 연동을 통한 무마찰 인증
  * **세션 관리**: JWT 토큰 기반 세션 관리 및 자동 갱신
  * **권한 분리**: 역할 기반 접근 제어(RBAC) - 관리자/일반 사용자/게스트

  ### 🔹 2.1.2 데이터 입력 및 파일 관리
  * **스마트 카테고리 분류**: 화장품, 식품, 패션 등 10개 주요 업종 분류
  * **동적 입력 필드**: 선택된 카테고리별 맞춤형 추가 정보 수집
  * **멀티 포맷 지원**: PDF, DOCX, XLSX, CSV 파일 업로드
  * **보안 저장**: AWS S3를 통한 암호화 저장, 버전 관리, 백업 정책 적용

  ### 🔹 2.1.3 다차원 데이터 수집 및 전처리
  * **시청자 행동 데이터 분석**: 실시간 시청 패턴, 인구통계, 디지털 성향, 시청 환경 분석
  * **PPL 성과 데이터 통합**: 방송사, 소셜미디어, 검색 트렌드 데이터 연동
  * **데이터 품질 관리**: 이상치 탐지, 머신러닝 기반 결측값 처리, 데이터 정규화

  ### 🔹 2.1.4 AI 기반 보고서 생성
  * **프롬프트 오케스트레이션**: 카테고리별 전문화된 프롬프트를 사용하여 분석 정확도 향상
  * **AI 모델 이중 구조**: 빠른 처리를 위한 `Gemini-2.5-flash-lite`와 심층 분석을 위한 `Skywork API` 활용
  * **8단계 보고서 생성 파이프라인**: 요약부터 향후 계획까지 체계적인 보고서 자동 생성

  ### 🔹 2.1.5 인터랙티브 대시보드 및 시각화
  * **실시간 성과 모니터링**: KPI 대시보드, 드릴다운 분석, 다차원 비교 뷰, 미래 성과 예측
  * **고급 시각화 기능**: D3.js 기반 동적 차트, 히트맵, 워드클라우드, 트렌드라인

  ### 🔹 2.1.6 고급 내보내기 및 공유
  * **다중 포맷 지원**:
