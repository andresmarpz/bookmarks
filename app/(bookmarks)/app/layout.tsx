import { PropsWithChildren } from 'react'
import UserDropdown from '@/components/shared/user-dropdown'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <header className="p-3">
        <UserDropdown />
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
