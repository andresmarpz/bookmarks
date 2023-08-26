import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Search } from "lucide-react"

import { getSession } from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"
import Spinner from "@/components/ui/Spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardPage from "@/components/pages/dashboard/DashboardPage"
import NewBookmarkServer from "@/components/pages/dashboard/bookmarks/NewBookmark/NewBookmark.server"
import BookmarkList from "@/components/pages/dashboard/bookmarks/bookmark-list"

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const session = await getSession()

  const group = await prisma.group.findFirst({
    where: {
      slug,
      userId: session.user.uid,
    },
    include: {
      bookmarks: true,
    },
  })

  if (!group) return notFound()

  return (
    <DashboardPage title={group.name}>
      <div className="my-8">
        <header>
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
    </DashboardPage>
  )
}