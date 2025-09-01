import { 
  AnalysisResult, 
  DashboardStats, 
  ReportItem, 
  ApiError, 
  HttpStatus,
  API_ENDPOINTS 
} from "@/types/api";

// API 클라이언트 기본 설정
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: ApiError | null }> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: {
            code: response.status.toString(),
            message: data.message || '요청 처리 중 오류가 발생했습니다.',
            details: data.details
          }
        };
      }

      return { data: data.data || data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          code: 'NETWORK_ERROR',
          message: '네트워크 오류가 발생했습니다.',
          details: error
        }
      };
    }
  }

  // 대시보드 통계 조회
  async getDashboardStats(): Promise<{ data: DashboardStats | null; error: ApiError | null }> {
    return this.request<DashboardStats>(API_ENDPOINTS.DASHBOARD_STATS);
  }

  // 리포트 목록 조회
  async getReports(): Promise<{ data: ReportItem[] | null; error: ApiError | null }> {
    return this.request<ReportItem[]>(API_ENDPOINTS.REPORTS_LIST);
  }

  // 분석 결과 조회
  async getAnalysisResult(submitNum: string): Promise<{ data: AnalysisResult | null; error: ApiError | null }> {
    return this.request<AnalysisResult>(API_ENDPOINTS.ANALYSIS_RESULT(submitNum));
  }

  // 기존 데이터 차트 이미지 URL 조회
  async getExistingChartUrl(submitNum: string): Promise<{ data: string | null; error: ApiError | null }> {
    const result = await this.request<{ imageUrl: string }>(
      API_ENDPOINTS.EXISTING_CHART(submitNum)
    );
    
    if (result.error) {
      return { data: null, error: result.error };
    }
    
    return { data: result.data?.imageUrl || null, error: null };
  }

  // 예측 데이터 차트 이미지 URL 조회
  async getPredictionChartUrl(submitNum: string): Promise<{ data: string | null; error: ApiError | null }> {
    const result = await this.request<{ imageUrl: string }>(
      API_ENDPOINTS.PREDICTION_CHART(submitNum)
    );
    
    if (result.error) {
      return { data: null, error: result.error };
    }
    
    return { data: result.data?.imageUrl || null, error: null };
  }

  // 차트 이미지 다운로드
  async downloadChart(submitNum: string, chartType: 'existing' | 'prediction'): Promise<void> {
    const endpoint = chartType === 'existing' 
      ? API_ENDPOINTS.EXISTING_CHART(submitNum)
      : API_ENDPOINTS.PREDICTION_CHART(submitNum);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}?download=true`);
      
      if (!response.ok) {
        throw new Error('차트 다운로드에 실패했습니다.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${submitNum}_${chartType}_chart.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('차트 다운로드 실패:', error);
      throw error;
    }
  }

  // 분석 재시도
  async retryAnalysis(submitNum: string): Promise<{ data: boolean | null; error: ApiError | null }> {
    return this.request<boolean>(`/api/analysis/${submitNum}/retry`, {
      method: 'POST',
    });
  }

  // 리포트 삭제
  async deleteReport(submitNum: string): Promise<{ data: boolean | null; error: ApiError | null }> {
    return this.request<boolean>(`/api/analysis/${submitNum}`, {
      method: 'DELETE',
    });
  }
}

// 싱글톤 인스턴스
export const apiClient = new ApiClient();

// Mock 데이터 생성 함수들 (개발/테스트용)
export const createMockDashboardStats = (): DashboardStats => ({
  totalAnalyses: 47,
  tokensRemaining: 8500,
  tokensUsed: 1500,
  totalTokens: 10000,
  reportsThisMonth: 12,
  successRate: 94.2
});

export const createMockReports = (): ReportItem[] => [
  {
    id: "RPT-001",
    productName: "포카리스웨트",
    category: "식품 / 음료 / 이온음료",
    status: "completed",
    createdAt: "2024-09-01T10:30:00Z",
    completedAt: "2024-09-01T10:32:00Z"
  },
  {
    id: "RPT-002", 
    productName: "삼성 갤럭시 S24",
    category: "전자제품 / 스마트폰",
    status: "processing",
    createdAt: "2024-09-01T14:15:00Z",
    progress: 65
  },
  {
    id: "RPT-003",
    productName: "나이키 에어맥스",
    category: "패션 / 신발 / 운동화",
    status: "completed",
    createdAt: "2024-08-31T16:20:00Z",
    completedAt: "2024-08-31T16:23:00Z"
  },
  {
    id: "RPT-004",
    productName: "BMW X3",
    category: "자동차 / SUV",
    status: "failed",
    createdAt: "2024-08-31T09:45:00Z"
  },
  {
    id: "RPT-005",
    productName: "맥도날드 빅맥",
    category: "식품 / 패스트푸드",
    status: "pending",
    createdAt: "2024-08-30T13:00:00Z"
  }
];

export const createMockAnalysisResult = (submitNum: string): AnalysisResult => ({
  submitNum: submitNum,
  productName: "포카리스웨트",
  category: "식품",
  subCategory: "음료 / 이온음료", 
  status: "completed",
  createdAt: "2024-09-01T10:30:00Z",
  completedAt: "2024-09-01T10:32:00Z",
  marketingTargets: [
    {
      rank: 1,
      demographic: "남성 18-24세",
      description: "스포츠 활동이 활발한 젊은 남성층",
      percentage: 32.5
    },
    {
      rank: 2, 
      demographic: "여성 18-34세",
      description: "건강을 중시하는 젊은 여성층",
      percentage: 28.7
    },
    {
      rank: 3,
      demographic: "고활동성 라이프스타일",
      description: "운동/레저 활동을 즐기는 전 연령층",
      percentage: 19.3
    }
  ],
  pplCases: [
    {
      id: "case-1",
      title: "스포츠 예능 프로그램",
      description: "경기 후 회복 문맥에서 자연스러운 노출. SNS 버즈 상승과 시음회 이벤트 연계로 높은 효과",
      category: "예능",
      performance: "ROI 2.8x",
      roi: 2.8
    },
    {
      id: "case-2", 
      title: "캠퍼스 청춘 드라마",
      description: "동아리/기숙사 장면에서 3-4회 분산 노출. 편의점 매대 프로모션과 병행하여 타겟층 직접 도달",
      category: "드라마",
      performance: "ROI 2.3x",
      roi: 2.3
    },
    {
      id: "case-3",
      title: "주말 가족 예능",
      description: "가족 단위 시청자 대상으로 피크타임 전후 배치. 가족 묶음 할인쿠폰과 연계",
      category: "예능", 
      performance: "ROI 1.9x",
      roi: 1.9
    }
  ],
  roiMetrics: {
    top10: 3.0,
    top50: 2.1,
    top80: 1.6
  }
});