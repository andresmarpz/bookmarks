import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    }
  )

  const sessionQuery = await supabase.auth.getSession()
  const loggedIn = !sessionQuery.error && sessionQuery.data.session

  const url = request.nextUrl.clone()

  if (!loggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    url.pathname = "/auth/signin"
    url.searchParams.set("returnTo", request.nextUrl.pathname)

    return NextResponse.redirect(url)
  } else if (loggedIn && request.nextUrl.pathname.startsWith("/auth")) {
    url.pathname = "/dashboard"
    url.searchParams.delete("returnTo")

    return NextResponse.redirect(url)
  }

  return response
}

export const config = { matcher: ["/dashboard/:path*", "/auth/:path*"] }
