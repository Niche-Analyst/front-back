//front/components/sections/PartnersSection.tsx
export function PartnersSection() {
  const partners = ["SHV", "pwc", "PICNIC", "RITUALS...", "WAR CHILD", "NATIONALE POSTCODE LOTERIJ"];

  return (
    <section className="container py-12">
      <p className="mb-8 text-center text-sm font-semibold uppercase text-muted-foreground tracking-widest">
        Wij werken samen met werkgevers van wereldklasse
      </p>
      {/* [정렬 문제 해결]
        - flex와 flex-wrap을 사용하여 로고들을 가로로 나열하고, 화면이 작아지면 자동으로 줄바꿈되도록 합니다.
        - justify-center로 중앙 정렬하고, gap으로 일정한 간격을 유지합니다.
      */}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {partners.map((partner) => (
          <div key={partner} className="text-2xl font-bold text-muted-foreground/60 grayscale hover:grayscale-0 transition-all">
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
}
