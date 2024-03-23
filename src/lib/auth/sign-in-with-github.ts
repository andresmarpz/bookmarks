import type { SignInWithOAuthCredentials } from "@supabase/supabase-js"
import { createClientComponentSupabase } from "~/lib/supabase/create-client-component.supabase"

export async function signInWithGithub({
  redirectTo,
}: SignInWithOAuthCredentials["options"] = {}) {
  const url = new URL(window.location.origin + "/auth/callback")
  url.searchParams.append("returnTo", redirectTo ?? "/dashboard")
  url.searchParams.append("provider", "github")

  const { error } = await createClientComponentSupabase().auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: url.toString(),
    },
  })
  if (error) {
    throw error
  }
}
