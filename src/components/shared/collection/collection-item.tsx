import { MouseEvent } from 'react'
import { m } from 'framer-motion'
import { Hash, Pencil, Trash } from 'lucide-react'
import { useDeleteCollection } from '~/server/api/routers/collection/use-delete.collection'
import useStore from '~/state/store'
import { Collection } from '~/types'

import { api } from '~/lib/api'
import { Button } from '~/components/shared/button'
import Spinner from '~/components/shared/spinner'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '~/components/ui/context-menu'

interface Props {
  collection: Collection
  index: number
}

export default function CollectionItem({ collection, index }: Props) {
  const { currentCollection, setCurrentCollection } = useStore()

  const { mutate: deleteCollection, isLoading: isDeleting } =
    useDeleteCollection()

  const handleClick = () => setCurrentCollection(collection)

  const handleMenuEdit = () => {}
  const handleMenuDelete = (event: MouseEvent) => {
    if (currentCollection?.id === collection.id) setCurrentCollection(undefined)
    event.preventDefault()
    event.stopPropagation()
    deleteCollection({ id: collection.id })
  }

  return (
    <m.li
      animate={{
        opacity: [0, 1],
        translateY: [16, 0]
      }}
      transition={{
        duration: 0.2,
        delay: index * 0.075
      }}
      className="w-full"
      onClick={handleClick}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="flex w-full justify-center gap-2 px-8 text-left"
          >
            <Hash className="mr-2 h-4 w-4" />
            <span className="grow text-base">{collection.name}</span>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleMenuDelete}
            className="flex justify-between"
            disabled={isDeleting}
          >
            <span className="flex grow items-center">
              <Trash className="mr-2 h-4 w-4 text-red-400" /> Delete
            </span>
            {isDeleting && <Spinner height={16} width={16} />}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </m.li>
  )
}
