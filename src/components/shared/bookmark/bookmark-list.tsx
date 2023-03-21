import { useCallback, useMemo } from 'react'
import { Bookmark } from '@prisma/client'
import { InfiniteData } from '@tanstack/react-query'

import { RouterInputs, RouterOutputs, api } from '~/lib/api'
import { cn } from '~/lib/utils'
import BookmarkItemSkeleton from '~/components/shared/bookmark/bookmark-item-skeleton'
import BookmarkItem from './bookmark-item'

interface Props {
  count: number

  queryInput: RouterInputs['bookmark']['getBookmarks']
  onMutationError: (
    previousData?: InfiniteData<RouterOutputs['bookmark']['getBookmarks']>
  ) => void
  onMutationSettled: () => void
}

export default function BookmarkList({
  count,
  queryInput,
  onMutationError,
  onMutationSettled
}: Props) {
  const context = api.useContext()

  const { data, isLoading, fetchNextPage, hasNextPage } =
    api.bookmark.getBookmarks.useInfiniteQuery(queryInput, {
      getNextPageParam: (lastPage) => lastPage?.nextCursor
    })
  const bookmarks = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data?.pages]
  )

  const onDelete = useCallback(
    (id: Bookmark['id']) => {
      context.bookmark.getBookmarks.cancel()

      const previousData =
        context.bookmark.getBookmarks.getInfiniteData(queryInput)
      context.bookmark.getBookmarks.setInfiniteData(queryInput, (old) => {
        return {
          pages: (old?.pages ?? []).map((page) => ({
            ...page,
            items: page.items.filter((bookmark) => bookmark.id !== id)
          })),
          pageParams: old?.pageParams.filter((cursor) => cursor !== id) ?? []
        }
      })

      return previousData
    },
    [context.bookmark.getBookmarks, queryInput]
  )

  const skeletonList = useMemo(
    () => Array.from({ length: count ?? 0 }),
    [count]
  )

  return (
    <div className="p-4">
      <ul className={cn('flex flex-col gap-3')}>
        {isLoading || !bookmarks
          ? skeletonList.map((_, index) => <BookmarkItemSkeleton key={index} />)
          : bookmarks.map((bookmark, index) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                index={index}
                onDelete={onDelete}
                onMutationError={onMutationError}
                onMutationSettled={onMutationSettled}
              />
            ))}
      </ul>
    </div>
  )
}
