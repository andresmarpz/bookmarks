import { PropsWithChildren, Suspense } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/providers/theme-toggle'
import GroupContainer from '@/components/shared/group/group-container'
import GroupContainerLoading from '@/components/shared/group/group-container-loading'
import UserDropdown from '@/components/shared/user-dropdown'
import { TriangleIcon } from 'lucide-react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <header className="flex w-full p-3 justify-between items-center">
        <span className="flex items-center gap-2">
          <Link href="/">
            <TriangleIcon className="h-4 w-4" />
          </Link>
          <hr className="bg-gray-700 dark:bg-gray-400 border-none w-[1px] h-5 mx-3 [transform:_rotate(16deg)]" />
          <Suspense fallback={null}>
            {/* @ts-expect-error RSC */}
            <GroupContainer />
          </Suspense>
        </span>
        <span className="flex gap-2 items-center">
          <ThemeToggle />
          <UserDropdown />
        </span>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
