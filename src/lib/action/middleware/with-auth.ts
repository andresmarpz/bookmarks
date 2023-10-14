import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export async function withAuth() {
  const supabase = createServerActionClient({ cookies })
  const session = await supabase.auth.getSession()

  if (!session) throw new Error("You must be authenticated")

  return {
    session,
  }
}
