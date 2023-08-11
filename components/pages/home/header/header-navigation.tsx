import { type PropsWithChildren } from "react"
import Link from "next/link"

const NAVIGATION = [
  {
    href: "/features",
    label: "Features",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
] as const

export default function HeaderNavigation() {
  return (
    <nav className="flex justify-center gap-2 self-center text-sm">
      {NAVIGATION.map(({ href, label }) => (
        <NavigationItem key={href} href={href}>
          {label}
        </NavigationItem>
      ))}
    </nav>
  )
}

type ItemProps = PropsWithChildren<{ href: string }>
function NavigationItem({ href, children }: ItemProps) {
  return (
    <Link
      className="rounded px-2 py-1 font-medium text-gray-400 transition-colors hover:text-gray-200"
      href={href}
    >
      {children}
    </Link>
  )
}
