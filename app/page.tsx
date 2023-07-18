import Link from "next/link"
import { ChevronRight } from "lucide-react"

import FooterTechnologies from "@/components/pages/home/footer/footer-technologies"
import HeaderNavigation from "@/components/pages/home/header/header-navigation"
import DummyBookmarks from "@/components/pages/home/main/dummy-bookmarks"

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-b-neutral-800 bg-black/40 backdrop-blur-sm">
        <div className="m-auto grid max-w-6xl grid-cols-3 p-4 text-gray-400">
          <span>B</span>
          <HeaderNavigation />
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
      <main className="bg-gradient-to-tl from-black via-zinc-600/20 to-black pb-28 pt-60">
        <div className="m-auto max-w-6xl">
          <h1 className="bg-gradient-to-t from-gray-600 to-white bg-clip-text text-center font-calSans text-4xl font-bold text-transparent xsm:text-5xl sm:text-7xl lg:text-8xl">
            Bookmarks, easier.
          </h1>
          <h2 className="flex justify-center text-gray-400 xsm:text-lg sm:text-xl">
            Built open-source. Simple, clean, fast.
          </h2>

          <div className="mt-16 flex justify-center">
            <Link
              href="/app"
              className="flex items-center gap-1 rounded-lg bg-neutral-800 px-4 py-1 text-lg text-gray-100 shadow-md shadow-neutral-800 transition-colors hover:bg-neutral-700 hover:text-gray-50"
            >
              Start now <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <section className="mt-52">
          <h3 className="text-center font-calSans text-3xl tracking-wide text-gray-300">
            Display with full page metadata.
          </h3>
          <ul className="mt-4 flex flex-col gap-3 px-4 text-gray-200">
            <DummyBookmarks />
          </ul>
        </section>

        <section className="relative z-10 mt-32 py-10">
          <h5 className="text-center font-calSans text-4xl tracking-wide text-gray-200">
            Try it out now. Public beta available.
          </h5>
        </section>
      </main>
      <footer className="border-t border-t-neutral-800 bg-neutral-950/40 px-8 pb-20 pt-12 text-sm text-gray-400">
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
