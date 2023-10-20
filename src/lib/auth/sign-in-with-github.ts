import type { SignInWithOAuthCredentials } from "@supabase/supabase-js"

import { supabaseClientComponent } from "@/lib/supabase.client"

export async function signInWithGithub({
  redirectTo,
}: SignInWithOAuthCredentials["options"] = {}) {
  const url = new URL(window.location.origin + "/auth/callback")
  url.searchParams.append("returnTo", redirectTo ?? "/dashboard")
  url.searchParams.append("provider", "github")

  const { error } = await supabaseClientComponent.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: url.toString(),
    },
  })
  if (error) {
    throw error
  }
}
