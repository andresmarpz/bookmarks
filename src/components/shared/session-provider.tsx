"use client"

import { useEffect, type PropsWithChildren } from "react"

import { queryClient } from "@/lib/react-query.client"
import { createClientComponentSupabase } from "@/lib/supabase/create-client-component.supabase"
import { useSession } from "@/hooks/auth/use-session"

export default function SessionProvider({ children }: PropsWithChildren) {
  const { refetch } = useSession({ redirect: false })

  useEffect(() => {
    const {
      data: { subscription },
    } = createClientComponentSupabase().auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(["user/session"], () => session)
      refetch()
    })

    return () => subscription.unsubscribe()
  })

  return <>{children}</>
}
