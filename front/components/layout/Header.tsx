// components/layout/Header.tsx
import Link from "next/link"; // Next.js의 Link 컴포넌트를 불러옵니다.

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">  
        <Link href="/">
          <div className="font-extrabold tracking-tight cursor-pointer">
            ORB AI
          </div>
        </Link>
        <nav className="hidden sm:block text-sm text-muted-foreground">
          IPTV · PPL · Analytics
        </nav>
      </div>
    </header>
  );
}