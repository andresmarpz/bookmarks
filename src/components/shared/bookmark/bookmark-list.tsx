import { Collection } from '@prisma/client'

import { api } from '~/lib/api'
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
    <ul className="flex flex-col gap-3 p-4">
      {data.pages
        .flatMap((page) => page.items)
        .map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
    </ul>
  )
}
