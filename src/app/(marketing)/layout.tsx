import Link from "next/link"
import { BookmarkIcon } from "lucide-react"

import FooterTechnologies from "@/components/pages/home/footer/footer-technologies"
import HeaderNavigation from "@/components/pages/home/header/header-navigation"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-b-neutral-800 bg-black/40 backdrop-blur-sm">
        <div className="m-auto grid max-w-6xl grid-cols-3 p-4 text-gray-400">
          <Link href="/" className="flex h-8 w-8 items-center justify-center rounded">
            <BookmarkIcon />
          </Link>
          <HeaderNavigation />
          <span className="flex justify-end">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded bg-neutral-800 px-4 py-1 text-sm text-gray-100 shadow shadow-neutral-800 transition-colors hover:bg-neutral-700 hover:text-gray-50"
            >
              Dashboard
            </Link>
          </span>
        </div>
      </header>
      <main className="bg-gradient-to-tl from-black via-zinc-600/20 to-black ">
        {children}
      </main>
      <footer className="h-56 border-t border-t-neutral-800 bg-neutral-950/20 px-8 pb-20 pt-12 text-sm text-gray-400">
        <div className="m-auto flex max-w-6xl justify-between ">
          <span className="flex flex-col gap-1">
            <p>Open-source.</p>
            <p>
              Built with <FooterTechnologies />
            </p>
            <p>
              Crafted by{" "}
              <a
                className="text-gray-300 hover:text-gray-200"
                href="https://andrs.me"
                target="_blank"
                rel="noreferrer noopener"
              >
                Andrés
              </a>{" "}
            </p>
          </span>
          <span>
            <a
              className="text-gray-300 hover:text-gray-200"
              href="https://github.com/andresmarpz/bookmarks"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
