import { PropsWithChildren } from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import UserDropdown from "@/components/shared/user-dropdown"

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <header>
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
