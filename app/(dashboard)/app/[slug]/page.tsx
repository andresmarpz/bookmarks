import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import NewBookmark from "@/components/pages/dashboard/new-bookmark"

export default async function SlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const bookmarksPromise = prisma.bookmark.findMany({
    where: {
      groupSlug: slug,
    },
  })

  const groupPromise = prisma.group.findFirst({
    where: {
      slug,
    },
  })

  const [bookmarks, group] = await Promise.all([bookmarksPromise, groupPromise])
  if (!group) return notFound()

  return (
    <div>
      <NewBookmark slug={slug} />
      {bookmarks.map((bookmark) => (
        <span key={bookmark.id}>{bookmark.title}</span>
      ))}
    </div>
  )
}
