// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/auth/supabaseClient";
import { User } from "@supabase/supabase-js";

export function HeroSection() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <section className="container flex flex-col items-center justify-center text-center py-24 sm:py-32">
      <h1 className="max-w-6xl text-4xl font-bold tracking-tight sm:text-6xl">
        PPL 광고 효과 분석 플랫폼
      </h1>
      <p className="mt-6 max-w-6xl text-lg leading-8 text-muted-foreground">
        데이터 분석을 통해 IPTV 광고의 성과를 정확하게 측정하고, AI가 생성한 전문적인 리포트로 ROI를 극대화하세요.
      </p>
      
      {!loading && (
        <div className="mt-10 flex gap-4">
          {user ? (
            // 로그인된 사용자용 버튼들
            <>
              <Link href="/submit">
                <button className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-white hover:bg-primary/90 transition-colors">
                  새 분석 시작하기 →
                </button>
              </Link>
              <Link href="/result/dashboard">
                <button className="inline-flex h-11 items-center rounded-lg border border-input bg-background px-6 hover:bg-accent hover:text-accent-foreground transition-colors">
                  내 대시보드 보기
                </button>
              </Link>
            </>
          ) : (
            // 비로그인 사용자용 버튼
            <Link href="/auth/signin">
              <button className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-white hover:bg-primary/90 transition-colors">
                분석 시작하기 →
              </button>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
