import { MouseEvent, useCallback } from 'react'
import Image from 'next/image'
import { Bookmark } from '@prisma/client'
import { InfiniteData } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { Pencil, Trash } from 'lucide-react'

import { RouterOutputs, api } from '~/lib/api'
import { cn } from '~/lib/utils'
import Spinner from '~/components/shared/spinner'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '~/components/ui/context-menu'

interface Props {
  bookmark: Bookmark
  index: number
  onDelete: (
    id: string
  ) => InfiniteData<RouterOutputs['bookmark']['getBookmarks']> | undefined
  onMutationError: (
    previousData?: InfiniteData<RouterOutputs['bookmark']['getBookmarks']>
  ) => void
  onMutationSettled: () => void
}

export default function BookmarkItem({
  bookmark,
  index,
  onDelete,
  onMutationError,
  onMutationSettled
}: Props) {
  const { mutateAsync: deleteMutation, isLoading: isDeleting } =
    api.bookmark.deleteBookmark.useMutation({
      onMutate: async (deletedBookmark) => onDelete(deletedBookmark.id),
      onError: (error, deletedBookmark, ctx) => onMutationError(ctx),
      onSettled: () => onMutationSettled()
    })

  const handleDelete = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      await deleteMutation({ id: bookmark.id })
    },
    [bookmark.id, deleteMutation]
  )

  return (
    <m.li
      animate={{ opacity: [0, 1], translateY: [16, 0] }}
      transition={{ duration: 0.2, delay: index * 0.075 }}
      className={cn(
        'h-fit w-full rounded-md shadow',
        'bg-white dark:bg-neutral-950',
        'border border-gray-200 hover:border-gray-400 dark:border-neutral-800 dark:hover:border-neutral-500',
        'duration-50 transition-all ease-linear'
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <a
            className="flex items-start gap-3 p-4"
            href={bookmark.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {bookmark.favicon && (
              <Image
                src={bookmark.favicon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="shrink-0 grow-0 basis-6 rounded-md"
              />
            )}
            <span>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                {bookmark.title}
              </h4>
              <p className="text-sm text-gray-500">{bookmark.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bookmark.url.replace(/^(https?:\/\/)?/, '')}
              </p>
            </span>
          </a>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleDelete}
            className="flex justify-between"
            disabled={isDeleting}
          >
            <span className="flex grow items-center">
              <Trash className="mr-2 h-4 w-4 text-red-400" /> Delete
            </span>
            {isDeleting && <Spinner height={16} width={16} />}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </m.li>
  )
}
