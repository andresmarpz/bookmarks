import { PropsWithChildren } from "react"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import Navigator from "@/components/pages/dashboard/header/navigator"
import NewBookmark from "@/components/pages/dashboard/new-bookmark"
import UserDropdown from "@/components/shared/user-dropdown"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <header className="flex items-center justify-between gap-2 py-4">
        <Navigator />
        <UserDropdown
          image={session!.user.image!}
          email={session!.user.email ?? undefined}
          username={session!.user.username ?? undefined}
        />
      </header>
      <main>{children}</main>
    </>
  )
}
