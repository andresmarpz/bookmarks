import { cache } from "react"
import { getServerSession, type Session } from "next-auth"

import { authOptions } from "@/lib/auth/next-auth"

// assert that session exists since this is only used
// in the dashboard, which previously required authentication
export const getSession = cache(() => {
  return getServerSession(authOptions)
}) as () => Promise<Session>
