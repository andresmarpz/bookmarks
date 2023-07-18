import { PropsWithChildren } from "react"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import Navigator from "@/components/pages/dashboard/header/navigator"
import UserDropdown from "@/components/shared/user-dropdown"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen max-w-6xl bg-neutral-950 px-3">
      <header className="flex items-center justify-between gap-2 border-b border-b-neutral-800 py-4">
        <Navigator />
        <UserDropdown
          image={session!.user.image!}
          email={session!.user.email ?? undefined}
          username={session!.user.username ?? undefined}
        />
      </header>
      <main className="py-8">{children}</main>
    </div>
  )
}
