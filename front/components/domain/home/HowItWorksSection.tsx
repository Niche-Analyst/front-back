// components/sections/HowItWorksSection.tsx
import { Upload, PieChart, FileText } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="container py-24 sm:py-32 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Powerful Features for Your Business
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Discover how our platform can transform your IPTV advertising strategy.
      </p>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-8 border rounded-lg">
          <Upload className="h-10 w-10 text-primary mb-4" />
          <h3 className="font-bold text-lg">1. 데이터 업로드</h3>
          <p className="text-muted-foreground mt-2">광고 데이터를 손쉽게 업로드하세요.</p>
        </div>
        <div className="flex flex-col items-center p-8 border rounded-lg">
          <PieChart className="h-10 w-10 text-primary mb-4" />
          <h3 className="font-bold text-lg">2. AI 분석</h3>
          <p className="text-muted-foreground mt-2">AI가 데이터를 심층 분석합니다.</p>
        </div>
        <div className="flex flex-col items-center p-8 border rounded-lg">
          <FileText className="h-10 w-10 text-primary mb-4" />
          <h3 className="font-bold text-lg">3. 리포트 확인</h3>
          <p className="text-muted-foreground mt-2">맞춤형 분석 리포트를 확인하세요.</p>
        </div>
      </div>
    </section>
  );
}