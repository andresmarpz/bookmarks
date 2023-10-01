import type { SignInWithOAuthCredentials } from "@supabase/supabase-js"

import { supabaseCCC } from "@/lib/supabase.client"

export async function signInWithGithub({
  redirectTo,
}: SignInWithOAuthCredentials["options"] = {}) {
  const { error } = await supabaseCCC.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?returnTo=${
        redirectTo ?? "/dashboard"
      }`,
    },
  })
  if (error) {
    throw error
  }
}
