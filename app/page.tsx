import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Balancer } from "react-wrap-balancer"

import NavigationItem from "@/components/pages/home/header/navigation-item"
import DummyBookmarks from "@/components/pages/home/main/dummy-bookmarks"

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <header className="sticky top-0 border-b border-b-neutral-800 bg-black/40 backdrop-blur-sm">
        <div className="m-auto grid max-w-6xl grid-cols-3 p-4 text-gray-400">
          <span>B</span>
          <nav className="flex justify-center gap-2 self-center text-sm">
            {NAVIGATION.map(({ href, label }) => (
              <NavigationItem key={href} href={href}>
                {label}
              </NavigationItem>
            ))}
          </nav>
          <span className="flex justify-end">
            <Link
              href="/app"
              className="flex items-center gap-1 rounded bg-neutral-800 px-4 py-1 text-sm text-gray-100 shadow shadow-neutral-800 transition-colors hover:bg-neutral-700 hover:text-gray-50"
            >
              Dashboard
            </Link>
          </span>
        </div>
      </header>
      <main className="m-auto max-w-6xl">
        <div className="mt-40">
          <h1 className="bg-gradient-to-t from-gray-600 to-white bg-clip-text text-center font-calSans text-4xl font-bold text-transparent xsm:text-5xl sm:text-7xl lg:text-8xl">
            Bookmarks, easier.
          </h1>
          <h2 className="mt-2 flex justify-center text-gray-400 xsm:text-lg sm:text-xl">
            Built open-source. Simple, clean, fast.
          </h2>

          <div className="mt-8 flex justify-center">
            <Link
              href="/app"
              className="flex items-center gap-1 rounded-lg bg-neutral-800 px-4 py-1 text-lg text-gray-100 shadow-md shadow-neutral-800 transition-colors hover:bg-neutral-700 hover:text-gray-50"
            >
              Start now <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <section className="mt-40">
          <h3 className="text-center font-calSans text-3xl tracking-wide">
            Display with full page metadata.
          </h3>
          <ul className="mt-4 flex flex-col gap-3 px-4 text-gray-200">
            <DummyBookmarks />
          </ul>
        </section>
      </main>
      <footer className="m-auto mt-24 flex max-w-6xl justify-between px-8 py-16 text-sm text-gray-400">
        <span className="flex flex-col gap-1">
          <p>Open-source.</p>
          <p>Built with Tailwind, Next.js, Prisma, Supabase and Vercel.</p>
        </span>
        <span>
          <a
            href="https://github.com/andresmarpz/bookmarks"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </span>
      </footer>
    </div>
  )
}
