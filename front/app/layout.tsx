import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ORB AI - IPTV PPL 광고 효과 분석 및 리포팅 플랫폼",
  description: "AI 기반 실시간 분석으로 IPTV 광고 ROI를 극대화.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
