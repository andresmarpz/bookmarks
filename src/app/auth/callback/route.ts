import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  const returnTo = requestUrl.searchParams.get("returnTo")
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = returnTo || "/dashboard"
  redirectUrl.searchParams.delete("code")
  redirectUrl.searchParams.delete("returnTo")

  return NextResponse.redirect(redirectUrl)
}
