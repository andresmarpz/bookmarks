import { Target } from 'lucide-react'
import useStore from '~/state/store'

import { api } from '~/lib/api'
import { cn } from '~/lib/utils'
import { Button } from '~/components/shared/button'
import CollectionList from '~/components/shared/collection/collection-list'
import NewCollection from '~/components/shared/new-collection'
import ThemeChanger from '../../shared/theme-changer'
import UserDropdown from './user-dropdown'

interface Props {
  avatar: string
}

export default function Sidebar({ avatar }: Props) {
  const { data, isLoading } = api.collection.getCollections.useQuery()
  const { setCurrentCollection } = useStore()

  if (isLoading || !data) {
    return <div>Loading..</div>
  }

  return (
    <aside
      className={cn(
        'min-w-[300px] p-3 py-6 ',
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
        <CollectionList collections={data} />
      </div>
    </aside>
  )
}
