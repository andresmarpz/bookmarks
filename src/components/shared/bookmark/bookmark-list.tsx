import { Collection } from '@prisma/client'

import { api } from '~/lib/api'
import { cn } from '~/lib/utils'
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

  if (isLoading || !data) return <div>Loading..</div>
  return (
    <ul className={cn('flex flex-col gap-3')}>
      {data.pages
        .flatMap((page) => page.items)
        .map((bookmark, index) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} index={index} />
        ))}
    </ul>
  )
}
