import Image from 'next/image'
import { Bookmark } from '@prisma/client'
import { m } from 'framer-motion'

import { cn } from '~/lib/utils'

interface Props {
  bookmark: Bookmark
  index: number
}

export default function BookmarkItem({ bookmark, index }: Props) {
  return (
    <m.li
      animate={{ opacity: [0, 1], translateY: [16, 0] }}
      transition={{ duration: 0.2, delay: index * 0.075 }}
      className={cn(
        'h-fit w-full rounded-md shadow',
        'bg-white dark:bg-neutral-950',
        'border border-gray-200 hover:border-gray-400 dark:border-neutral-800 dark:hover:border-neutral-500',
        'duration-50 transition-all ease-linear'
      )}
    >
      <a
        className="flex items-start gap-3 p-4"
        href={bookmark.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {bookmark.favicon && (
          <Image
            src={bookmark.favicon}
            alt=""
            width={24}
            height={24}
            unoptimized
            className="shrink-0 grow-0 basis-6 rounded-md"
          />
        )}
        <span>
          <h4 className="font-medium text-gray-800 dark:text-gray-200">
            {bookmark.title}
          </h4>
          <p className="text-sm text-gray-500">{bookmark.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {bookmark.url.replace(/^(https?:\/\/)?/, '')}
          </p>
        </span>
      </a>
    </m.li>
  )
}
