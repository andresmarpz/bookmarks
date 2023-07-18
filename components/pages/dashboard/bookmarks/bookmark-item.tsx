"use client"

import { useTransition } from "react"
import Image from "next/image"
import { Bookmark } from "@prisma/client"

import { deleteBookmark } from "@/lib/actions/bookmarks/delete-bookmark"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface Props {
  bookmark: Bookmark
}
export default function BookmarkItem({ bookmark }: Props) {
  const [isDeleting, startDeleteTransition] = useTransition()

  return (
    <li>
      <ContextMenu>
        <ContextMenuTrigger>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex gap-1 rounded border p-2"
          >
            <span>
              {bookmark.image ? (
                <Image
                  unoptimized
                  src={bookmark.image}
                  alt=""
                  width={32}
                  height={32}
                />
              ) : (
                <div className="h-8 w-8 rounded bg-gray-800" />
              )}
            </span>
            <span>
              <h5 className="text-gray-100">{bookmark.title}</h5>
              <p className="text-gray-400">{bookmark.description}</p>
            </span>
          </a>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() =>
              startDeleteTransition(() =>
                deleteBookmark(bookmark.id, bookmark.groupSlug)
              )
            }
            disabled={isDeleting}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  )
}
