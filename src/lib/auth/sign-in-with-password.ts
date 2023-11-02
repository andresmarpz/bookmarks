import type { SignInWithPasswordCredentials } from "@supabase/supabase-js"

import { supabaseClientComponent } from "@/lib/supabase.client"

export async function signInWithPassword(opts: SignInWithPasswordCredentials) {
  const { data, error } = await supabaseClientComponent.auth.signInWithPassword(opts)
  if (error) {
    throw error
  }

  return data.session
}
