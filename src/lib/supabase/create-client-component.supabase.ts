import { createBrowserClient } from "@supabase/ssr"

import { env } from "@/config/env"

export function createClientComponentSupabase() {
  return createBrowserClient(
    env.client.NEXT_PUBLIC_SUPABASE_URL!,
    env.client.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
