"use client"

import React, { forwardRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/clsx"

export const SidebarItem = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ children, ...props }, forwardedRef) => {
  const pathname = usePathname()
  const isActive = props.href === pathname

  return (
    <Link
      ref={forwardedRef}
      {...props}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
        "dark:hover:bg-zinc-900",
        "transition-colors",
        isActive && "bg-zinc-800 font-medium"
      )}
    >
      {children}
    </Link>
  )
})
SidebarItem.displayName = "SidebarItem"
