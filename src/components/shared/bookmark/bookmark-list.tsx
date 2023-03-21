import { useMemo } from 'react'
import { useBookmarks } from '~/server/api/routers/bookmark/use-bookmarks'

import { cn } from '~/lib/utils'
import BookmarkItemSkeleton from '~/components/shared/bookmark/bookmark-item-skeleton'
import BookmarkItem from './bookmark-item'

interface Props {
  count: number
}

export default function BookmarkList({ count }: Props) {
  const { data, isLoading } = useBookmarks()
  const bookmarks = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data?.pages]
  )

  const skeletonList = useMemo(
    () => Array.from({ length: count ?? 0 }),
    [count]
  )

  return (
    <div className="p-4">
      <ul className={cn('flex flex-col gap-3')}>
        {isLoading || !bookmarks
          ? skeletonList.map((_, index) => (
              <BookmarkItemSkeleton key={'bookmark-skeleton-' + index} />
            ))
          : bookmarks.map((bookmark, index) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                index={index}
              />
            ))}
      </ul>
    </div>
  )
}
