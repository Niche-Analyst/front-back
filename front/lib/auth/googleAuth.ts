import { createClient } from "./supabaseClient";

export async function signInWithGoogle() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3001/auth/callback", // OAuth 완료 후 이동 경로
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
  }
}
