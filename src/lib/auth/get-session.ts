import { cache } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Session } from "@supabase/supabase-js"

export const getSession = cache(async () => {
  const supabase = createServerComponentClient({ cookies })
  return supabase.auth.getSession().then((query) => {
    if (query.error) throw query.error

    return query.data.session as Session
  })
})
