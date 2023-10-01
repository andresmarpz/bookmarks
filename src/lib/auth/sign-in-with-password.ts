import type { SignInWithPasswordCredentials } from "@supabase/supabase-js"

import { supabaseCCC } from "@/lib/supabase.client"

export async function signInWithPassword(opts: SignInWithPasswordCredentials) {
  const { data, error } = await supabaseCCC.auth.signInWithPassword(opts)
  if (error) {
    throw error
  }

  return data.session
}
