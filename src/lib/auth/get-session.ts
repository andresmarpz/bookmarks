import { cache } from "react"
import type { Session } from "@supabase/supabase-js"
import { createServerComponentSupabase } from "~/lib/supabase/create-server-component.supabase"
~/~/~/
export const getSession = cache(async () => {
  const supabase = createServerComponentSupabase()
  return supabase.auth.getSession().then((query) => {
    if (query.error) throw query.error

    return query.data.session as Session
  })
})
