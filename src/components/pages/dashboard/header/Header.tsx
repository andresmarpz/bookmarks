import { Suspense } from "react"
import Link from "next/link"

import GroupSwitcherServer, {
  LoadingGroupSwitcher,
} from "@/components/pages/dashboard/groups/group-switcher.server"
import UserDropdown, {
  LoadingUserDropdown,
} from "@/components/pages/dashboard/sidebar/user-dropdown"

export default function Header() {
  return (
    <header className="border-b border-b-neutral-700">
      <div className="m-auto max-w-6xl justify-between pt-8">
        <div className="flex items-center justify-between">
          <Suspense fallback={<LoadingGroupSwitcher />}>
            <GroupSwitcherServer />
          </Suspense>
          <Suspense fallback={<LoadingUserDropdown />}>
            <UserDropdown />
          </Suspense>
        </div>

        <div className="mb-2 flex items-center gap-2 pt-8">
          <Link
            href="/dashboard"
            className="rounded-md bg-transparent px-3 py-1 text-sm transition-colors hover:bg-zinc-700"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/analytics"
            className="rounded-md bg-transparent px-3 py-1 text-sm transition-colors hover:bg-zinc-700"
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-md bg-transparent px-3 py-1 text-sm transition-colors hover:bg-zinc-700"
          >
            Settings
          </Link>
        </div>
      </div>
    </header>
  )
}