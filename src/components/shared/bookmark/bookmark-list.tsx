import { useCallback, useMemo } from 'react'
import { Bookmark } from '@prisma/client'
import { InfiniteData } from '@tanstack/react-query'
import { Collection } from '~/types'

import { RouterInputs, RouterOutputs, api } from '~/lib/api'
import { cn } from '~/lib/utils'
import BookmarkItemSkeleton from '~/components/shared/bookmark/bookmark-item-skeleton'
import NewBookmark from '~/components/shared/new-bookmark'
import BookmarkItem from './bookmark-item'

interface Props {
  currentCollection: Collection | undefined
}

export default function BookmarkList({ currentCollection }: Props) {
  const context = api.useContext()

  const queryInput: RouterInputs['bookmark']['getBookmarks'] = useMemo(
    () => ({ collectionId: currentCollection?.id, limit: 20 }),
    [currentCollection?.id]
  )
  const { data, isLoading, fetchNextPage, hasNextPage } =
    api.bookmark.getBookmarks.useInfiniteQuery(queryInput, {
      getNextPageParam: (lastPage) => lastPage?.nextCursor
    })

  const onDeleteBookmark = useCallback(
    (id: Bookmark['id']) => {
      context.bookmark.getBookmarks.cancel()

      const previousData =
        context.bookmark.getBookmarks.getInfiniteData(queryInput)
      context.bookmark.getBookmarks.setInfiniteData(queryInput, (old) => {
        return {
          ...old,
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

  const onMutationError = useCallback(
    (previousData?: InfiniteData<RouterOutputs['bookmark']['getBookmarks']>) =>
      context.bookmark.getBookmarks.setInfiniteData(queryInput, previousData),
    [context.bookmark.getBookmarks, queryInput]
  )

  const skeletonList = useMemo(
    () => Array.from({ length: currentCollection?._count.bookmarks ?? 0 }),
    [currentCollection?._count.bookmarks]
  )

  return (
    <div className="p-4">
      <ul className={cn('flex flex-col gap-3')}>
        {isLoading || !data
          ? skeletonList.map((_, index) => <BookmarkItemSkeleton key={index} />)
          : data.pages
              .flatMap((page) => page.items)
              .map((bookmark, index) => (
                <BookmarkItem
                  key={bookmark.id}
                  bookmark={bookmark}
                  index={index}
                  onDelete={onDeleteBookmark}
                  onMutationError={onMutationError}
                />
              ))}
      </ul>
    </div>
  )
}
