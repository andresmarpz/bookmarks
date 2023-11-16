import type { SignInWithPasswordCredentials } from "@supabase/supabase-js"

import { createClientComponentSupabase } from "@/lib/supabase/create-client-component.supabase"

export async function signInWithPassword(opts: SignInWithPasswordCredentials) {
  const { data, error } =
    await createClientComponentSupabase().auth.signInWithPassword(opts)
  if (error) {
    throw error
  }

  return data.session
}
