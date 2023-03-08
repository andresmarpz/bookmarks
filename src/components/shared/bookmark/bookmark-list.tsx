import { useMemo } from 'react'
import { Collection } from '@prisma/client'

import { api } from '~/lib/api'
import { cn } from '~/lib/utils'
import BookmarkItemSkeleton from '~/components/shared/bookmark/bookmark-item-skeleton'
import BookmarkItem from './bookmark-item'

interface Props {
  currentCollection: Collection | undefined
}

export default function BookmarkList({ currentCollection }: Props) {
  const { data, isLoading } = api.bookmark.getBookmarks.useInfiniteQuery(
    {
      collectionId: currentCollection?.id
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      select: (data) => {
        return {
          pages: [...data.pages].reverse(),
          pageParams: [...data.pageParams].reverse()
        }
      }
    }
  )

  const skeletonList = useMemo(() => Array.from({ length: 5 }), [])

  return (
    <ul className={cn('flex flex-col gap-3')}>
      {/* {skeletonList.map((_, index) => (
        <BookmarkItemSkeleton key={index} />
      ))} */}
      {isLoading || !data
        ? skeletonList.map((_, index) => <BookmarkItemSkeleton key={index} />)
        : data.pages
            .flatMap((page) => page.items)
            .map((bookmark, index) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                index={index}
              />
            ))}
    </ul>
  )
}
