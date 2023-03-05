import { Collection } from '@prisma/client'
import { Hash } from 'lucide-react'
import useStore from '~/state/store'

interface Props {
  collection: Collection
}

export default function CollectionItem({ collection }: Props) {
  const { setCurrentCollection } = useStore()

  const handleClick = () => setCurrentCollection(collection)

  return (
    <li>
      <button
        className="flex w-full items-center gap-2  p-2 pl-4 text-left"
        onClick={handleClick}
      >
        <Hash className="h-4 w-4" /> {collection.name}
      </button>
    </li>
  )
}
