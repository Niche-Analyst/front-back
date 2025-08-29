import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// ✨ 1. 백엔드 전용 환경 변수를 사용합니다. (NEXT_PUBLIC_ 접두사 없음)
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY as string;

// ✨ 2. Service Role Key를 사용하여 모든 RLS를 우회하는 관리자용 클라이언트를 생성합니다.
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const { user_id, email, full_name } = await request.json();

    if (!user_id || !email) {
      return NextResponse.json({ error: 'user_id and email are required' }, { status: 400 });
    }

    // ✨ 3. 'select' 후 'insert' 대신 'upsert'를 사용하여 코드를 간결화하고 안정성을 높입니다.
    // 'id'가 이미 존재하면 업데이트하고, 없으면 삽입합니다.
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: user_id,
        email: email,
        full_name: full_name,
        // ✨ 4. 스키마에 없는 created_at 필드를 제거합니다.
        // updated_at은 default now()이므로 자동으로 처리됩니다.
      })
      .select() // 삽입/업데이트된 데이터를 반환받습니다.
      .single();

    if (error) {
      // Supabase에서 발생한 구체적인 에러를 로그로 남깁니다.
      console.error('Supabase error:', error.message);
      throw error;
    }

    return NextResponse.json({ message: 'User profile saved successfully.', data }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}