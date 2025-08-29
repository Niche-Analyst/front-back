import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

// 함수가 cookieStore를 인자로 받도록 수정합니다.
export const createClient = (cookieStore: ReadonlyRequestCookies) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // 서버 컴포넌트에서 set을 호출하면 발생하는 오류는 무시 가능
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // 서버 컴포넌트에서 remove를 호출하면 발생하는 오류는 무시 가능
          }
        },
      },
    }
  )
}