import { useCallback, useMemo } from 'react'
import { Bookmark } from '@prisma/client'
import { InfiniteData } from '@tanstack/react-query'
import useStore from '~/state/store'

import { RouterInputs, RouterOutputs, api } from '~/lib/api'
import BookmarkList from '~/components/shared/bookmark/bookmark-list'
import NewBookmark from '~/components/shared/new-bookmark'

export default function Main() {
  const currentCollection = useStore((state) => state.currentCollection)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-medium">
          {currentCollection ? currentCollection.name : 'All bookmarks'}
        </h2>
        <NewBookmark />
      </div>
      <BookmarkList count={currentCollection?._count.bookmarks ?? 0} />
    </div>
  )
}
