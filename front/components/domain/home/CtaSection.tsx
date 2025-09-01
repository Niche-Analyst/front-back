// components/sections/CtaSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/auth/supabaseClient";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export function CtaSection() {
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
    <section className="w-full bg-secondary py-24 sm:py-32">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          지금 바로 시작해보세요
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          ORB AI와 함께 데이터 기반의 광고 전략을 수립하고 비즈니스 성장을 경험하세요.
        </p>
        {!loading && (
          <div className="mt-10 flex justify-center gap-4">
            {user ? (
              <>
                <Button size="lg" asChild>
                  <Link href="/submit">새 분석 시작하기</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/result/dashboard">내 대시보드</Link>
                </Button>
              </>
            ) : (
              <Button size="lg" asChild>
                <Link href="/auth/signin">무료로 시작하기</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}