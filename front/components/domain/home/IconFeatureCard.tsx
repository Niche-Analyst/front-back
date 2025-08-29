//front/components/widgets/IconFeatureCard.tsx
import { Card } from "@/components/ui/card";
import { type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconFeatureCardProps extends React.ComponentProps<typeof Card> {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

export function IconFeatureCard({
  icon: Icon,
  title,
  description,
  className,
  ...props
}: IconFeatureCardProps) {
  return (
    // Card 컴포넌트를 사용하되, 기본 스타일(테두리, 그림자)을 제거하여
    // 섹션 배경과 자연스럽게 어우러지도록 합니다.
    <Card
      className={cn(
        "flex flex-col items-center text-center p-6 border-none shadow-none bg-transparent",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </Card>
  );
}