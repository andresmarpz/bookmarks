import { AuthError } from "@supabase/supabase-js"
import { createServerActionSupabase } from "~/lib/supabase/create-server-action.supabase"

export async function withAuth() {
  const supabase = createServerActionSupabase()
  const session = await supabase.auth.getSession()

  if (!session)
    throw new AuthError("You must be authenticated to perform this action.", 401)

  return {
    session: session.data.session!,
  }
}
