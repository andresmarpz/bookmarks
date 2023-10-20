import { cache } from "react"
import type { Session } from "@supabase/supabase-js"

import { supabaseServerComponent } from "@/lib/supabase.rsc"

export const getSession = cache(async () => {
  return supabaseServerComponent.auth.getSession().then((query) => {
    if (query.error) throw query.error

    return query.data.session as Session
  })
})
