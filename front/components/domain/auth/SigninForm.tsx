// front/components/domain/auth/SigninForm.tsx

"use client";

import { createClient } from "@/lib/auth/supabaseClient";
import { Button } from "@/components/ui/button";

const SigninForm = () => {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">로그인</h2>
      <Button onClick={handleGoogleLogin} className="w-full">
        Google로 로그인
      </Button>
    </div>
  );
};

export default SigninForm;