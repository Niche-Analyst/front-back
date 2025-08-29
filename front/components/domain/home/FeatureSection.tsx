// components/sections/FeatureSection.tsx
import { BarChart, Bot, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "실시간 분석",
    description: "실시간으로 광고 성과를 분석하여 즉시 최적화 방안을 제시합니다.",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "AI 기반 인사이트",
    description: "머신러닝 기반 분석으로 광고 효과를 극대화하는 데이터 인사이트를 제공합니다.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "ROI 최적화",
    description: "데이터 기반 현황으로 광고 투자 수익률을 향상시키는 전략을 도출합니다.",
  },
];

export function FeatureSection() {
  return (
    <section className="w-full bg-secondary py-24 sm:py-32">
      <div className="container grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-background">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}