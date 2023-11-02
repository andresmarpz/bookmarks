import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { AuthError } from "@supabase/supabase-js"

export async function withAuth() {
  const supabase = createServerActionClient({ cookies })
  const session = await supabase.auth.getSession()

  if (!session)
    throw new AuthError("You must be authenticated to perform this action.", 401)

  return {
    session: session.data.session!,
  }
}
