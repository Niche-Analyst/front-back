"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Download, 
  FileImage, 
  Loader2,
  TrendingUp,
  Users,
  Target
} from "lucide-react";
import Link from "next/link";
import { AnalysisResult } from "@/types/api";
import { apiClient, createMockAnalysisResult } from "@/lib/api-client";



export default function ResultPage() {
  const params = useParams();
  const submitNum = params.submitNum as string;
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        
        // 실제 API 호출 시도 (개발 중에는 mock 데이터 사용)
        const { data, error } = await apiClient.getAnalysisResult(submitNum);
        
        if (error || !data) {
          // API 실패시 mock 데이터 사용
          console.warn('API 호출 실패, mock 데이터 사용:', error);
          setResult(createMockAnalysisResult(submitNum));
        } else {
          setResult(data);
        }
        
      } catch (err) {
        console.warn('API 호출 오류, mock 데이터 사용:', err);
        setResult(createMockAnalysisResult(submitNum));
      } finally {
        setLoading(false);
      }
    };

    if (submitNum) {
      fetchResult();
    }
  }, [submitNum]);

  const handleExportPDF = () => {
    // PDF 내보내기 구현
    window.print();
  };

  const handleDownloadChart = (chartType: "existing" | "prediction") => {
    // 차트 다운로드 구현
    console.log(`Downloading ${chartType} chart...`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">분석 결과를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button asChild>
                <Link href="/result/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  대시보드로 돌아가기
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">결과를 찾을 수 없습니다.</p>
              <Button asChild>
                <Link href="/result/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  대시보드로 돌아가기
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 헤더 */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/result/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  대시보드로 돌아가기
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{result.productName}</h1>
                <Badge variant="secondary">#{result.submitNum}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/submit">
                  새 분석 시작
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                PDF 내보내기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 제품 정보 및 카테고리 */}
        <section className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-base px-3 py-1">
                    {result.category} / {result.subCategory}
                  </Badge>
                  <Badge>분석 완료</Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                분석 완료: {new Date(result.completedAt!).toLocaleString('ko-KR')}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 마케팅 주요 타겟 */}
        <section className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                마케팅 주요 타겟 (설문 기반, 카테고리별)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.marketingTargets.map((target) => (
                  <div key={target.rank} className="relative">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {target.rank}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{target.demographic}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{target.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-xs font-medium text-primary">
                            {target.percentage}%
                          </div>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${target.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ROI 지표 */}
        <section className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ROI 벤치마크 지표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{result.roiMetrics.top10}×</div>
                  <div className="text-sm font-medium">Top 10% 평균 ROI</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{result.roiMetrics.top50}×</div>
                  <div className="text-sm font-medium">Top 50% 평균 ROI</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{result.roiMetrics.top80}×</div>
                  <div className="text-sm font-medium">Top 80% 평균 ROI</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 좌우 분할 레이아웃 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 좌측: 기존 데이터 차트 */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>기존 데이터 분석</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadChart("existing")}
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      차트 다운로드
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    {result.existingDataChart ? (
                      <img 
                        src={result.existingDataChart} 
                        alt="기존 데이터 차트"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <FileImage className="h-12 w-12 mx-auto mb-2" />
                        <p>백엔드에서 생성된 차트가 여기에 표시됩니다</p>
                        <p className="text-sm mt-1">API: GET /api/analysis/{submitNum}/existing-chart</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    해당 카테고리의 기존 PPL 광고 데이터를 기반으로 한 성과 분석
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 우측: PPL 성공사례 + 예측 데이터 */}
          <div className="lg:col-span-5">
            <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {/* PPL 성공 사례 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    PPL 성공 사례
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.pplCases.map((pplCase, index) => (
                    <div key={pplCase.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm">{pplCase.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {pplCase.performance}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {pplCase.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {pplCase.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 사용자 제품 예측 데이터 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>사용자 제품 예측 분석</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadChart("prediction")}
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      차트 다운로드
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    {result.predictionChart ? (
                      <img 
                        src={result.predictionChart} 
                        alt="예측 분석 차트"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                        <p>사용자 제품 예측 차트가 여기에 표시됩니다</p>
                        <p className="text-sm mt-1">API: GET /api/analysis/{submitNum}/prediction-chart</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    사용자가 제출한 문서와 기존 데이터를 결합한 예측 분석 결과
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 하단 면책 조항 */}
        <section className="mt-8 pt-6 border-t">
          <div className="text-xs text-muted-foreground">
            <p>
              ⚠️ 면책조항: 모든 수치는 데이터 분석에 기반한 예측값이며, 실제 광고 성과와 다를 수 있습니다. 
              투자 결정 시 충분한 검토를 권장합니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}