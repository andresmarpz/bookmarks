"use client"

import { useTransition } from "react"
import Image from "next/image"
import { Bookmark } from "@prisma/client"
import { Copy, Pencil, TrashIcon } from "lucide-react"

import { deleteBookmark } from "@/lib/actions/bookmarks/delete-bookmark"
import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface Props {
  bookmark: Bookmark
  onDelete: (bookmark: Bookmark) => void
}
export default function BookmarkItem({ bookmark, onDelete }: Props) {
  const [isDeleting, startDeleteTransition] = useTransition()

  function handleDelete() {
    onDelete(bookmark)
    startDeleteTransition(() => deleteBookmark(bookmark.id, bookmark.groupSlug))
  }

  return (
    <li>
      <ContextMenu>
        <ContextMenuTrigger>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "flex gap-3 rounded border p-2",
              "hover:bg-neutral-900/80",
              "transition-colors"
            )}
          >
            <span>
              {bookmark.image ? (
                <Image
                  className="rounded"
                  unoptimized
                  src={bookmark.image}
                  alt=""
                  width={24}
                  height={24}
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
          <ContextMenuItem className="flex items-center gap-2">
            <Pencil className="h-3 w-3" /> Rename
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center gap-2"
            onClick={() => navigator.clipboard.writeText(bookmark.url)}
          >
            <Copy className="h-3 w-3" /> Copy
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center gap-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <TrashIcon className="h-3 w-3" /> Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  )
}
