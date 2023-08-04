import { notFound } from "next/navigation"
import { PlusIcon, Search } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BookmarkList from "@/components/pages/dashboard/bookmarks/bookmark-list"

export default async function SlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const group = await prisma.group.findFirst({
    where: {
      slug,
    },
    include: {
      bookmarks: true,
    },
  })

  if (!group) return notFound()

  return (
    <div>
      <header>
        <h1 className="mb-6 font-calSans text-3xl">{group.name}</h1>
        <div className="flex gap-4">
          <div className="relative grow">
            <span className="absolute left-3 top-1/2 -translate-y-2">
              <Search className="h-4 w-4 text-gray-500" />
            </span>
            <Input
              name="search"
              placeholder="Search within your bookmarks.."
              className="pl-10"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 rounded-lg border bg-neutral-800 px-4 py-0 text-sm text-gray-100 shadow-md shadow-neutral-800/70 transition-colors hover:bg-neutral-700 hover:text-gray-50"
          >
            <PlusIcon className="mr-2 h-3 w-3" /> New
          </Button>
        </div>
      </header>
      <div className="py-4">
        <BookmarkList bookmarks={group.bookmarks} />
      </div>
    </div>
  )
}
