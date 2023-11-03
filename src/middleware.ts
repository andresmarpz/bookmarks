import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const sessionQuery = await supabase.auth.getSession()
  const loggedIn = !sessionQuery.error && sessionQuery.data.session

  const url = req.nextUrl.clone()

  if (!loggedIn && req.nextUrl.pathname.startsWith("/dashboard")) {
    url.pathname = "/auth/signin"
    url.searchParams.set("returnTo", req.nextUrl.pathname)

    return NextResponse.redirect(url)
  } else if (loggedIn && req.nextUrl.pathname.startsWith("/auth")) {
    url.pathname = "/dashboard"
    url.searchParams.delete("returnTo")

    return NextResponse.redirect(url)
  }

  return res
}

export const config = { matcher: ["/dashboard/:path*", "/auth/:path*"] }
