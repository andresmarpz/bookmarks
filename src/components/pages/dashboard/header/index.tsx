import { Suspense } from "react"
import Link from "next/link"

import GroupSwitcherServer, {
  LoadingGroupSwitcher,
} from "@/components/pages/dashboard/groups/group-switcher.server"
import UserDropdown, {
  LoadingUserDropdown,
} from "@/components/pages/dashboard/header/user-dropdown"

export default function Header() {
  return (
    <header className="border-b border-b-neutral-700">
      <div className="m-auto max-w-6xl justify-between px-4 pt-8">
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
          <div
            // href="/dashboard/analytics"
            className="cursor-not-allowed rounded-md bg-transparent px-3 py-1 text-sm text-gray-500 transition-colors"
            aria-disabled="true"
          >
            Analytics
          </div>
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
