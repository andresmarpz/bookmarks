import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen justify-center bg-[#111] py-36 ">{children}</div>
  )
}
