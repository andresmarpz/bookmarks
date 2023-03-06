import { Collection } from '@prisma/client'
import { m } from 'framer-motion'
import { Hash } from 'lucide-react'
import useStore from '~/state/store'

import { cn } from '~/lib/utils'

interface Props {
  collection: Collection
  index: number
}

export default function CollectionItem({ collection, index }: Props) {
  const { setCurrentCollection } = useStore()

  const handleClick = () => setCurrentCollection(collection)

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
      className={cn(
        'flex w-full items-center gap-2 p-2 pl-4 text-left',
        'hover:bg-gray-100 dark:hover:bg-neutral-900',
        'duration-50 transition-all ease-linear',
        'cursor-pointer rounded-md'
        // 'hover:bg-gray-100 dark:hover:bg-neutral-900',
        // 'duration-50 transition-all ease-linear',
        // 'cursor-pointer',
        // 'rounded-md',
        // 'border border-gray-200 dark:border-neutral-800',
        // 'hover:border-gray-300 dark:hover:border-neutral-500',
        // 'bg-white dark:bg-neutral-950'
      )}
      onClick={handleClick}
    >
      <Hash className="h-4 w-4" /> {collection.name}
    </m.li>
  )
}
