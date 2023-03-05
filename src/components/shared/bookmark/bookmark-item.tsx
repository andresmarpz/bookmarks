import Image from 'next/image'
import { Bookmark } from '@prisma/client'

import { cn } from '~/lib/utils'

interface Props {
  bookmark: Bookmark
}

export default function BookmarkItem({ bookmark }: Props) {
  return (
    <li
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
            width={32}
            height={32}
            className="rounded-md"
            unoptimized
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
    </li>
  )
}
