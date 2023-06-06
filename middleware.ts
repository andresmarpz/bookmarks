import { NextResponse } from "next/server"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(function middleware(req: NextRequestWithAuth) {
  if (req.nextUrl.pathname === "/app")
    return NextResponse.redirect(new URL("/app/all", req.url))
})

export const config = { matcher: ["/app/:path*"] }
