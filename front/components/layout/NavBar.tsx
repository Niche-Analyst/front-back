// front/components/layout/NavBar.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/auth/supabaseClient";
import ProductDropdown from "../domain/home/ProductDropdown";
import WhyUsDropdown from "../domain/home/WhyUsDropdown";
import { User } from "@supabase/supabase-js";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // 종속성 배열을 비워두어 한 번만 실행되도록 수정

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    // [수정] justify-between을 사용하여 양쪽 끝으로 요소를 밀어냅니다.
    <nav className="fixed top-0 w-full bg-white text-black h-16 flex items-center justify-between px-10 shadow-lg border-b border-gray-300/50 z-50">
      
      {/* 1. 왼쪽 영역 (로고) */}
      {/* flex-1과 justify-start를 사용하여 왼쪽 공간을 차지하게 합니다. */}
      <div className="flex-1 flex justify-start">
        <Link href="/" className="text-xl font-bold">
          ORB AI
        </Link>
      </div>
      
      {/* 2. 중앙 영역 (메뉴) */}
      {/* flex-none을 주어 내용만큼의 너비만 차지하게 합니다. */}
      <div className="flex-none">
        <ul className="flex gap-16 list-none m-0 p-0 items-center">
          <ProductDropdown />
          <WhyUsDropdown />
          <li className="font-semibold cursor-pointer hover:text-orange-600 transition-colors">
            <ScrollLink to="contact" smooth duration={500}>
              Contact
            </ScrollLink>
          </li>
        </ul>
      </div>

      {/* 3. 오른쪽 영역 (버튼) */}
      {/* flex-1과 justify-end를 사용하여 오른쪽 공간을 차지하게 합니다. */}
      <div className="flex-1 flex justify-end">
        {user ? (
          // 로그인 상태
          <div className="flex items-center gap-4">
            <Link href="/result/dashboard">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                대시보드
              </button>
            </Link>
            <span className="text-sm font-semibold text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 로그아웃 상태
          <Link href="/auth/signin">
            <button className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-transform cursor-pointer">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;