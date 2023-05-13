import { PropsWithChildren, Suspense } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/providers/theme-toggle'
import UserDropdownContainer from '@/components/shared/user-dropdown/user-dropdown-container'
import { TriangleIcon } from 'lucide-react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <header className="flex w-full p-3 justify-between items-center h-20">
        <span className="flex items-center gap-2">
          <Link href="/">
            <TriangleIcon className="h-4 w-4" />
          </Link>
          <hr className="bg-gray-700 dark:bg-gray-400 border-none w-[1px] h-5 mx-3 [transform:_rotate(16deg)]" />
        </span>
        <span className="flex gap-2 items-center">
          <ThemeToggle />
          <Suspense fallback={'loading'}>
            {/* @ts-expect-error RSC */}
            <UserDropdownContainer />
          </Suspense>
        </span>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
