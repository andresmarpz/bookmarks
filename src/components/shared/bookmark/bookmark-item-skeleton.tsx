import { m } from 'framer-motion'

import { cn } from '~/lib/utils'

export default function BookmarkItemSkeleton() {
  return (
    <m.li
      animate={{ opacity: [0, 1], translateY: [16, 0] }}
      transition={{
        duration: 0.1
      }}
      className={cn(
        'h-fit w-full rounded-md shadow',
        'bg-white dark:bg-neutral-950',
        'border border-gray-200 hover:border-gray-400 dark:border-neutral-800 dark:hover:border-neutral-500',
        'duration-50 transition-all ease-linear'
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={cn(
            'h-6 w-6 shrink-0 grow-0 basis-6',
            'animate-pulse rounded-md bg-neutral-800'
          )}
        />
        <span className="flex grow flex-col gap-2">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
          <div className="h-9 w-full animate-pulse rounded bg-neutral-800" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
        </span>
      </div>
    </m.li>
  )
}
