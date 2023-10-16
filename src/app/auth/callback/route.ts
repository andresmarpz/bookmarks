import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

import { createUserWithGithub } from "@/lib/action/user/user.actions"
import { getUser } from "@/lib/query/user.queries"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  let redirect = undefined
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const query = await supabase.auth.exchangeCodeForSession(code)
    if (query.data.user?.id && query.data.user?.email) {
      const users = await getUser(query.data.user.id)
      if (!users.length) {
        const { email, id } = query.data.user
        try {
          await createUserWithGithub({
            email,
            id,
          })

          redirect = "/auth/onboarding"
        } catch (err) {
          return NextResponse.redirect("/auth/signin")
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  const returnTo = requestUrl.searchParams.get("returnTo")
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = redirect || returnTo || "/dashboard"
  redirectUrl.searchParams.delete("code")
  redirectUrl.searchParams.delete("returnTo")

  return NextResponse.redirect(redirectUrl)
}
