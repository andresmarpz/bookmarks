import { PropsWithChildren } from 'react'
import { ThemeToggle } from '@/components/providers/theme-toggle'
import UserDropdown from '@/components/shared/user-dropdown'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <header className="flex w-full p-3 justify-between">
        <span></span>
        <span className="flex gap-2 items-center">
          <ThemeToggle />
          <UserDropdown />
        </span>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
