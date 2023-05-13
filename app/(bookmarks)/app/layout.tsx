import { PropsWithChildren, Suspense } from "react"
import Link from "next/link"
import { TriangleIcon } from "lucide-react"

import { ThemeToggle } from "@/components/providers/theme-toggle"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <header className="flex h-20 w-full items-center justify-between p-3">
        <span className="flex items-center gap-2">
          <Link href="/">
            <TriangleIcon className="h-4 w-4" />
          </Link>
          <hr className="mx-3 h-5 w-[1px] border-none bg-gray-700 [transform:_rotate(16deg)] dark:bg-gray-400" />
        </span>
        <span className="flex items-center gap-2">
          <ThemeToggle />
        </span>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
