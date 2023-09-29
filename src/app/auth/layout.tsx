import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex min-h-screen justify-center py-36">{children}</div>
}
