import { Target } from 'lucide-react'
import useStore from '~/state/store'

import { cn } from '~/lib/utils'
import { Button } from '~/components/shared/button'
import CollectionList from '~/components/shared/collection/collection-list'
import NewCollection from '~/components/shared/new-collection'
import ThemeChanger from '../../shared/theme-changer'

export default function Sidebar() {
  const { setCurrentCollection } = useStore()

  return (
    <aside
      className={cn(
        'w-72 min-w-[288px] p-3 py-6',
        'border-r border-r-slate-200 dark:border-r-neutral-800'
      )}
    >
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">bmrks</h1>

        <span className="flex items-center gap-2">
          <ThemeChanger />
        </span>
      </div>

      <div className="mt-4">
        <Button
          className="mb-4 flex w-full items-center justify-center gap-2"
          variant="outline"
          onClick={() => setCurrentCollection(undefined)}
        >
          <Target className="h-4 w-4" />
          All bookmarks
        </Button>
        <h2 className="text-sm font-semibold text-neutral-500">Collections</h2>
        <NewCollection />

        <CollectionList />
      </div>
    </aside>
  )
}
