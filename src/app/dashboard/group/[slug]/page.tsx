import { Suspense } from "react"
import { notFound } from "next/navigation"
import BookmarkList from "~/components/pages/dashboard/bookmarks/bookmark-list"
import NewBookmarkServer from "~/components/pages/dashboard/bookmarks/new-bookmark.rsc"
import DashboardPage from "~/components/pages/dashboard/dashboard-page"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import Spinner from "~/components/ui/Spinner"
import { getGroupBySlug } from "~/lib/query/group.queries"
import { Search } from "lucide-react"

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const query = await getGroupBySlug(slug)

  if (!query.group) return notFound()

  const currentGroup = {
    slug: query.group.slug,
    id: query.group.id,
  }

  return (
    <DashboardPage title={query.group?.name}>
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
              <NewBookmarkServer currentGroup={currentGroup} />
            </Suspense>
          </div>
        </header>
        <div className="mt-10">
          <BookmarkList bookmarks={query.bookmarks}>
            <NewBookmarkServer currentGroup={currentGroup} />
          </BookmarkList>
        </div>
      </div>
    </DashboardPage>
  )
}
