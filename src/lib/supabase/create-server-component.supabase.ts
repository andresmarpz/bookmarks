import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { env } from "~/config/env"

export function createServerComponentSupabase() {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
      },
    }
  )
}
