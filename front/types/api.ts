// API 응답 타입 정의
export interface MarketingTarget {
  rank: number;
  demographic: string;
  description: string;
  percentage: number;
}

export interface PPLCase {
  id: string;
  title: string;
  description: string;
  category: string;
  performance: string;
  roi?: number;
}

export interface ROIMetrics {
  top10: number;
  top50: number;
  top80: number;
}

export interface AnalysisResult {
  submitNum: string;
  productName: string;
  category: string;
  subCategory: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
  completedAt?: string;
  marketingTargets: MarketingTarget[];
  pplCases: PPLCase[];
  existingDataChart?: string; // 백엔드에서 제공할 차트 이미지 URL
  predictionChart?: string;   // 백엔드에서 제공할 예측 차트 이미지 URL
  roiMetrics: ROIMetrics;
  analysisId?: string;
}

export interface ReportItem {
  id: string;
  productName: string;
  category: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
  progress?: number; // 진행률 (0-100)
}

export interface DashboardStats {
  totalAnalyses: number;
  tokensRemaining: number;
  tokensUsed: number;
  totalTokens: number;
  reportsThisMonth: number;
  successRate: number;
}

// API 요청/응답 타입들
export interface GetAnalysisResultRequest {
  submitNum: string;
}

export interface GetAnalysisResultResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export interface GetDashboardStatsResponse {
  success: boolean;
  data?: DashboardStats;
  error?: string;
}

export interface GetReportsResponse {
  success: boolean;
  data?: ReportItem[];
  error?: string;
}

// 차트 데이터 요청 타입들
export interface GetChartImageRequest {
  submitNum: string;
  chartType: "existing" | "prediction";
}

export interface GetChartImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// API 엔드포인트 경로
export const API_ENDPOINTS = {
  DASHBOARD_STATS: "/api/dashboard/stats",
  REPORTS_LIST: "/api/dashboard/reports", 
  ANALYSIS_RESULT: (submitNum: string) => `/api/analysis/${submitNum}`,
  EXISTING_CHART: (submitNum: string) => `/api/analysis/${submitNum}/existing-chart`,
  PREDICTION_CHART: (submitNum: string) => `/api/analysis/${submitNum}/prediction-chart`,
} as const;

// HTTP 상태 코드
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// API 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}