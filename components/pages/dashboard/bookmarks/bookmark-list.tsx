import { Bookmark } from "@prisma/client"

import BookmarkItem from "./bookmark-item"

interface Props {
  bookmarks: Bookmark[]
}

export default async function BookmarkList({ bookmarks }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  )
}
