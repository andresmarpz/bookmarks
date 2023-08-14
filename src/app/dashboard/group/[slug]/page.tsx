import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Search } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Spinner from "@/components/ui/Spinner"
import BookmarkList from "@/components/pages/dashboard/bookmarks/bookmark-list"
import NewBookmarkServer from "@/components/pages/dashboard/bookmarks/NewBookmark/NewBookmark.server"

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
          <Suspense
            fallback={
              <Button variant="secondary">
                <Spinner />
              </Button>
            }
          >
            <NewBookmarkServer currentGroup={group.id} />
          </Suspense>
        </div>
      </header>
      <div className="py-4">
        <BookmarkList bookmarks={group.bookmarks} />
      </div>
    </div>
  )
}
