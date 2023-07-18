import { AnchorHTMLAttributes, forwardRef, PropsWithChildren } from "react"
import Link from "next/link"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren<{
    href: string
  }>
const NavigationItem = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children }, ref) => {
    return (
      <Link
        className="rounded px-2 py-1 font-medium text-gray-400 transition-colors hover:text-gray-200"
        href={href}
        ref={ref}
      >
        {children}
      </Link>
    )
  }
)
NavigationItem.displayName = "NavigationItem"

export default NavigationItem
