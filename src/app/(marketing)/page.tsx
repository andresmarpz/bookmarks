import Link from "next/link"
import { ChevronRight } from "lucide-react"

import DummyBookmarks from "@/components/pages/home/main/dummy-bookmarks"

export default function Home() {
  return (
    <div className="pb-28 pt-60">
      <section className="m-auto max-w-6xl">
        <h1 className="bg-gradient-to-t from-gray-600 to-white bg-clip-text text-center font-calSans text-4xl font-bold text-transparent xsm:text-5xl sm:text-7xl lg:text-8xl">
          Bookmarks, easier.
        </h1>
        <h2 className="flex justify-center text-gray-400 xsm:text-lg sm:text-xl">
          Built open-source. Simple, clean, fast.
        </h2>

        <div className="mt-16 flex justify-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 rounded-lg bg-neutral-800 px-4 py-1 text-lg text-gray-100 shadow-md shadow-neutral-800 transition-colors hover:bg-neutral-700 hover:text-gray-50"
          >
            Start now <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

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
    </div>
  )
}
