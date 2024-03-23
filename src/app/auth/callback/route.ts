import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createUserWithGithub } from "~/lib/action/user/user.actions"
import { createRouteHandlerSupabase } from "~/lib/supabase/create-route-handler.supabase"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // URL to redirect to after sign in process completes
  const returnTo = requestUrl.searchParams.get("returnTo")
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = returnTo || "/dashboard"
  redirectUrl.searchParams.delete("code")
  redirectUrl.searchParams.delete("returnTo")
  redirectUrl.searchParams.delete("provider")

  if (code) {
    const supabase = createRouteHandlerSupabase()
    const query = await supabase.auth.exchangeCodeForSession(code)
    if (
      query.data.user?.id &&
      query.data.user?.email &&
      !query.data.user.user_metadata?.on_database
    ) {
      const { email, id } = query.data.user
      try {
        await createUserWithGithub({
          email,
          id,
        })

        redirectUrl.pathname = "/auth/onboarding"
      } catch (err) {
        redirectUrl.pathname = "/auth/signin"
        console.error(err)
      } finally {
        return NextResponse.redirect(redirectUrl)
      }
    }

    return NextResponse.redirect(redirectUrl)
  }
}
