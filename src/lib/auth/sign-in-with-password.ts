import type { SignInWithPasswordCredentials } from "@supabase/supabase-js"

import { queryClient } from "@/lib/react-query.client"
import { supabaseRCC } from "@/lib/supabase"

export async function signInWithPassword(opts: SignInWithPasswordCredentials) {
  const { data, error } = await supabaseRCC.auth.signInWithPassword(opts)
  if (error) {
    throw error
  }

  return data.session
}
