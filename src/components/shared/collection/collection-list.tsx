import { Collection } from '@prisma/client'

import { api } from '~/lib/api'
import CollectionItem from './collection-item'

interface Props {
  collections: Collection[]
}

export default function CollectionList({ collections }: Props) {
  return (
    <ul>
      {collections.map((collection) => (
        <CollectionItem key={collection.id} collection={collection} />
      ))}
    </ul>
  )
}
