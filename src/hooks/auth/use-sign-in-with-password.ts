import { useRouter } from "next/navigation"
import { type SignInWithPasswordCredentials } from "@supabase/supabase-js"
import { useMutation } from "@tanstack/react-query"

import { signInWithPassword } from "@/lib/auth/sign-in-with-password"

export function useSignInWithPassword(config?: { returnTo?: string }) {
  const router = useRouter()

  return useMutation({
    mutationKey: ["sign-in-with-password"],
    mutationFn: async (opts: SignInWithPasswordCredentials) => {
      await signInWithPassword(opts)

      router.push(config?.returnTo ?? "/dashboard")
    },
  })
}
