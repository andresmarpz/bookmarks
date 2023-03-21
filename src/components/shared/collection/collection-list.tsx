import { useMemo } from 'react'
import useCollections from '~/server/api/routers/collection/use-collections'

import Spinner from '~/components/shared/spinner'
import CollectionItem from './collection-item'

export default function CollectionList() {
  const { data, isLoading } = useCollections()
  const collections = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data?.pages]
  )

  if (isLoading) {
    return (
      <div className="mt-10 w-full">
        <Spinner />
      </div>
    )
  }

  return (
    <ul className="mt-3 flex flex-col items-start gap-3">
      {collections?.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </ul>
  )
}
