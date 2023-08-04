"use client"

import { experimental_useOptimistic as useOptimistic } from "react"
import { type Bookmark } from "@prisma/client"

import BookmarkItem from "./bookmark-item"

interface Props {
  bookmarks: Bookmark[]
}

type Action = { type: "delete" | "update" | "create"; payload: Bookmark }
function reducer(state: Bookmark[], action: Action) {
  switch (action.type) {
    case "create":
    case "update":
    case "delete": {
      return state.filter((bookmark) => bookmark.id !== action.payload.id)
    }
  }
}

export default function BookmarkList({ bookmarks }: Props) {
  const [state, dispatch] = useOptimistic<Bookmark[], Action>(
    bookmarks,
    reducer
  )

  return (
    <ul className="flex flex-col gap-3">
      {state.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={(bookmark) =>
            dispatch({ type: "delete", payload: bookmark })
          }
        />
      ))}
    </ul>
  )
}
