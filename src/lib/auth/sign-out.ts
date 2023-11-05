import { RedirectType, redirect } from "next/navigation"

import { createClientComponentSupabase } from "@/lib/supabase/create-client-component.supabase"

export async function signOut() {
  const supabase = createClientComponentSupabase()
  await supabase.auth.signOut()

  redirect(`/auth/signin`, RedirectType.replace)
}
