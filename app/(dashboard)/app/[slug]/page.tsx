import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import BookmarkList from "@/components/pages/dashboard/bookmarks/bookmark-list"
import NewBookmark from "@/components/pages/dashboard/bookmarks/new-bookmark"

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
    <div className="mt-20">
      <NewBookmark slug={slug} />
      <BookmarkList bookmarks={group.bookmarks} />
    </div>
  )
}
