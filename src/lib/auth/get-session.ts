import { cache } from "react"
import type { Session } from "@supabase/supabase-js"

import { supabaseSCC } from "@/lib/supabase.rsc"

export const getSession = cache(async () => {
  return supabaseSCC.auth.getSession().then((query) => {
    if (query.error) throw query.error

    return query.data.session as Session
  })
})
