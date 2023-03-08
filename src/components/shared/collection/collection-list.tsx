import { api } from '~/lib/api'
import Spinner from '~/components/shared/spinner'
import CollectionItem from './collection-item'

export default function CollectionList() {
  const { data, isLoading } = api.collection.getCollections.useQuery()

  if (isLoading || !data) {
    return (
      <div className="mt-10 w-full">
        <Spinner />
      </div>
    )
  }
  return (
    <ul className="mt-3 flex flex-col items-start gap-3">
      {data.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </ul>
  )
}
