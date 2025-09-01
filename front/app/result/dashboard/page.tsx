"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Download,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { DashboardStats, ReportItem } from "@/types/api";
import { apiClient, createMockDashboardStats, createMockReports } from "@/lib/api-client";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 API 호출 시도 (개발 중에는 mock 데이터 사용)
        const [statsResult, reportsResult] = await Promise.allSettled([
          apiClient.getDashboardStats(),
          apiClient.getReports()
        ]);
        
        // 실패시 mock 데이터 사용
        if (statsResult.status === 'fulfilled' && !statsResult.value.error) {
          setStats(statsResult.value.data);
        } else {
          setStats(createMockDashboardStats());
        }
        
        if (reportsResult.status === 'fulfilled' && !reportsResult.value.error) {
          setReports(reportsResult.value.data || []);
        } else {
          setReports(createMockReports());
        }
        
      } catch (error) {
        // API 실패시 mock 데이터 사용
        console.warn('API 호출 실패, mock 데이터 사용:', error);
        setStats(createMockDashboardStats());
        setReports(createMockReports());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: ReportItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: ReportItem["status"]) => {
    const variants = {
      completed: "default",
      processing: "secondary", 
      failed: "destructive",
      pending: "outline"
    } as const;

    const labels = {
      completed: "완료",
      processing: "처리중",
      failed: "실패", 
      pending: "대기중"
    };

    return (
      <Badge variant={variants[status]}>
        {getStatusIcon(status)}
        <span className="ml-1">{labels[status]}</span>
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">대시보드를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">분석 대시보드</h1>
          <p className="text-muted-foreground mt-2">
            PPL 광고 효과 분석 결과를 확인하고 관리하세요
          </p>
        </div>
        <Button asChild>
          <Link href="/submit">
            <span className="mr-2">+</span>
            새 분석 시작
          </Link>
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 분석 횟수</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalAnalyses}</div>
            <p className="text-xs text-muted-foreground">
              누적 분석 완료
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">토큰 사용량</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.tokensRemaining.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              / {stats?.totalTokens.toLocaleString()} 잔여
            </p>
            <Progress 
              value={((stats?.tokensUsed || 0) / (stats?.totalTokens || 1)) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 리포트</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.reportsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              9월 생성된 리포트
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료율</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              성공적인 분석 비율
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 리포트 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 분석 리포트</CardTitle>
          <CardDescription>
            생성된 PPL 분석 리포트를 확인하고 관리할 수 있습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold truncate">{report.productName}</h3>
                    {getStatusBadge(report.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {report.category}
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>요청: {formatDate(report.createdAt)}</p>
                    {report.completedAt && (
                      <p>완료: {formatDate(report.completedAt)}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm font-mono text-muted-foreground">
                    {report.id}
                  </span>
                  
                  {report.status === "completed" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={`/result/${report.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          보기
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        다운로드
                      </Button>
                    </>
                  )}
                  
                  {report.status === "processing" && (
                    <div className="text-sm text-muted-foreground">
                      분석 중...
                    </div>
                  )}
                  
                  {report.status === "failed" && (
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      재시도
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}