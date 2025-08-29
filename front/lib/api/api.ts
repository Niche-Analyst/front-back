import { createClient } from '@supabase/supabase-js';

// .env.local 파일에서 환경 변수를 가져옵니다.
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// 백엔드 서버 주소
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function saveUserActivity(activityType: string, data: string) {
  // Supabase에서 현재 세션 정보 가져오기
  const { data: { session } } = await supabase.auth.getSession();

  // ⚠️ 로그인 세션이 없으면 가짜 토큰을 사용하도록 수정합니다.
  let accessToken = session?.access_token;
  if (!accessToken) {
    console.warn("No active session found. Using a dummy access token for testing.");
    // 이 토큰은 실제 사용자와 연관되지 않으므로 테스트 목적으로만 사용해야 합니다.
    accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMjMxNjIsImV4cCI6MTk4NjU3NjU2MiwiZ3JvdXBzIjpbImFiYyJdLCJzdWIiOiJkZWFkYmVlZi0xMjM0LTQ1NjctODkwMS0yMzQ1Njc4OTAxMjMifQ.eC7w1E8Jz3mE2QY5wz8F9pQo_k_iF6g8o6dG7n5Q6cQ";
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/save-activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        activity_type: activityType,
        data: data,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to save activity:', errorData);
      throw new Error(`API error: ${response.status} - ${errorData.detail}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error calling backend API:', error);
    throw error;
  }
}