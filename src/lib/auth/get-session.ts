import { cache } from "react"

import { supabaseSCC } from "@/lib/supabase.rsc"

export const getSession = cache(async () => {
  return supabaseSCC.auth.getSession().then((query) => {
    return query.error
      ? { error: query.error, session: null }
      : {
          session: query.data.session,
          error: null,
        }
  })
})
