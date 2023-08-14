import Link from "next/link"
import { Hash, Target } from "lucide-react"

import { getSession } from "@/lib/auth/get-session"
import NewGroup from "@/components/pages/dashboard/groups/NewGroup"
import GroupList from "@/components/pages/dashboard/sidebar/groups/GroupList"
import { SidebarItem } from "@/components/pages/dashboard/sidebar/SidebarItem"
import UserDropdown from "@/components/pages/dashboard/sidebar/user-dropdown"

export default async function Sidebar() {
  const session = await getSession()

  return (
    <aside className="flex w-2/12 min-w-[300px] flex-col border-r border-zinc-800 bg-gradient-to-bl from-neutral-950 via-zinc-800/30 to-neutral-950 p-4 py-6">
      <div className="flex grow flex-col gap-4">
        <section>
          <Link href="/">
            <h1 className="font-calSans text-2xl font-bold tracking-wide">
              Clutter
            </h1>
          </Link>
        </section>
        <section className="flex flex-col gap-2">
          <SidebarItem href="/dashboard/group/all">
            <Target className="h-4 w-4" />
            All Bookmarks
          </SidebarItem>
          <SidebarItem href="/dashboard">
            <Hash className="h-4 w-4" />
            Board
          </SidebarItem>
        </section>
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2>Groups</h2>
            <NewGroup />
          </div>
          <GroupList />
        </section>
      </div>
      <div className="flex justify-center pt-4">
        <UserDropdown
          image={session!.user.image!}
          name={session!.user.name!}
          email={session!.user.email!}
          username={session!.user.username}
        />
      </div>
    </aside>
  )
}
