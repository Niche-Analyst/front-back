// components/sections/CtaSection.tsx
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="w-full bg-secondary py-24 sm:py-32">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          지금 바로 시작해보세요
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          ORB AI와 함께 데이터 기반의 광고 전략을 수립하고 비즈니스 성장을 경험하세요.
        </p>
        <div className="mt-10">
          <Button size="lg">무료로 시작하기</Button>
        </div>
      </div>
    </section>
  );
}