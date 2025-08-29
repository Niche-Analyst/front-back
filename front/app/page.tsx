import { HeroSection } from "@/components/domain/home/HeroSection";
import { FeatureSection } from "@/components/domain/home/FeatureSection";
import { HowItWorksSection } from "@/components/domain/home/HowItWorksSection";
import { CtaSection } from "@/components/domain/home/CtaSection";
import  NavBar  from "@/components/layout/NavBar"; // NavBar 컴포넌트 임포트

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavBar /> {/* NavBar를 가장 위에 렌더링 */}
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <CtaSection />
    </div>
  );
};