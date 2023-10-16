import type { SignInWithOAuthCredentials } from "@supabase/supabase-js"

import { supabaseCCC } from "@/lib/supabase.client"

export async function signInWithGithub({
  redirectTo,
}: SignInWithOAuthCredentials["options"] = {}) {
  const url = new URL(window.location.origin + "/auth/callback")
  url.searchParams.append("returnTo", redirectTo ?? "/dashboard")
  url.searchParams.append("provider", "github")

  const { error } = await supabaseCCC.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: url.toString(),
    },
  })
  if (error) {
    throw error
  }
}
