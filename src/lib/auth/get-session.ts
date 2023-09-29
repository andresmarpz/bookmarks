import { cache } from "react"
import { getServerSession, type Session } from "next-auth"

import { authOptions } from "@/lib/auth/next-auth"

export const getSession = cache(() => {
  return getServerSession(authOptions)
}) as () => Promise<Session>
