import { type PropsWithChildren } from "react"
import Link from "next/link"

const TECHNOLOGIES = [
  {
    href: "https://tailwindcss.com",
    label: "Tailwind",
  },
  {
    href: "https://nextjs.org",
    label: "Next.js",
  },
  {
    href: "https://orm.drizzle.team",
    label: "Drizzle",
  },
  {
    href: "https://supabase.com",
    label: "Supabase",
  },
  {
    href: "https://vercel.com",
    label: "Vercel",
  },
] as const

export default function FooterTechnologies() {
  return TECHNOLOGIES.map(({ href, label }, idx) => (
    <>
      <NavigationItem key={href} href={href}>
        {label}
      </NavigationItem>
      {idx === TECHNOLOGIES.length - 2
        ? " and "
        : idx <= TECHNOLOGIES.length - 3
          ? ", "
          : null}
    </>
  ))
}

type ItemProps = PropsWithChildren<{ href: string }>
function NavigationItem({ href, children }: ItemProps) {
  return (
    <Link className="text-gray-300 hover:text-gray-200" href={href}>
      {children}
    </Link>
  )
}
