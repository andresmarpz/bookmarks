"use client"

import { type PropsWithChildren } from "react"

import type { Bookmark } from "@/db/schema/bookmark.entity"
import BookmarkItem from "./bookmark-item"

interface Props extends PropsWithChildren {
  bookmarks: Bookmark[]
}

export default function BookmarkList({ bookmarks, children }: Props) {
  return bookmarks.length ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between px-3 text-sm text-gray-400">
        <span>Title</span>
        <span>Created at</span>
      </div>
      <hr />
      <ul className="flex flex-col gap-3">
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </ul>
    </div>
  ) : (
    <div className="border-neutral-80 relative overflow-hidden rounded-xl border-2 bg-zinc-900 shadow-sm">
      <div className="relative z-10 p-6 pb-10 pt-16 antialiased">
        <h5 className="mb-1 text-lg font-medium text-gray-200">Create a Bookmark</h5>

        <p className="mb-6 text-sm leading-5 text-gray-400">
          Create your first bookmark to start collecting your internet discoveries.
        </p>

        {children}
      </div>
      <div className="dashed-grid-paper absolute right-0 top-1 h-full w-7/12 bg-zinc-900" />
      <div className="absolute right-0 top-1 h-full w-7/12 bg-gradient-to-br from-zinc-900 via-zinc-900/[85%] to-transparent" />
    </div>
  )
}
