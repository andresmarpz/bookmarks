import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { createClientComponentSupabase } from "@/lib/supabase/create-client-component.supabase"

interface Options {
  redirect?: boolean
}

export function useSession({ redirect = true }: Options = { redirect: true }) {
  const router = useRouter()
  const pathname = usePathname()

  return useQuery(["user/session"], async () => {
    const query = await createClientComponentSupabase().auth.getSession()

    if ((query.error || !query.data.session) && redirect) {
      router.push("/auth/signin?returnTo=" + pathname)
    }

    return query.error ? { error: query.error, session: null } : query.data.session
  })
}
