"use client"

import { useEffect, type PropsWithChildren } from "react"

import { queryClient } from "@/lib/react-query.client"
import { supabaseRCC } from "@/lib/supabase"
import { useSession } from "@/hooks/auth/use-session"

export default function SessionProvider({ children }: PropsWithChildren) {
  const { refetch } = useSession()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseRCC.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(["user/session"], () => session)
      refetch()
    })

    return () => subscription.unsubscribe()
  })

  return <>{children}</>
}
