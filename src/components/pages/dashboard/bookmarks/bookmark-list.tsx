"use client"

import type { Bookmark } from "@/db/schema/bookmark.entity"

import BookmarkItem from "./bookmark-item"

interface Props {
  bookmarks: Bookmark[]
}

export default function BookmarkList({ bookmarks }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  )
}
