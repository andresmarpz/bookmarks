"use client"

import { useEffect, type PropsWithChildren } from "react"

import { queryClient } from "@/lib/react-query.client"
import { supabaseClientComponent } from "@/lib/supabase.client"
import { useSession } from "@/hooks/auth/use-session"

export default function SessionProvider({ children }: PropsWithChildren) {
  const { refetch } = useSession({ redirect: false })

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClientComponent.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(["user/session"], () => session)
      refetch()
    })

    return () => subscription.unsubscribe()
  })

  return <>{children}</>
}
