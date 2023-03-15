import useStore from '~/state/store'

import Sidebar from '~/components/layout/sidebar'
import Header from '~/components/shared/app/header'
import BookmarkList from '~/components/shared/bookmark/bookmark-list'
import NewBookmark from '~/components/shared/new-bookmark'

const App = () => {
  const { currentCollection } = useStore()

  return (
    <div className="flex h-screen items-stretch">
      <Sidebar />
      <main className="flex h-full w-full grow flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        <Header />
        <hr className="border-neutral-200 dark:border-neutral-800" />
        <div className="p-4">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-lg font-medium">
              {currentCollection ? currentCollection.name : 'All bookmarks'}
            </h2>
            <NewBookmark />
          </div>
          <BookmarkList currentCollection={currentCollection} />
        </div>
      </main>
    </div>
  )
}
App.auth = true

export default App
