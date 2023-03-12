import { useSession } from 'next-auth/react'
import useStore from '~/state/store'

import Sidebar from '~/components/layout/sidebar'
import UserDropdown from '~/components/layout/sidebar/user-dropdown'
import BookmarkList from '~/components/shared/bookmark/bookmark-list'
import NewBookmark from '~/components/shared/new-bookmark'

const App = () => {
  const { data } = useSession()
  const { currentCollection } = useStore()

  return (
    <div className="flex h-screen items-stretch">
      <Sidebar />
      <main className="flex h-full w-full grow flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        <header className="flex items-center justify-between p-4">
          <NewBookmark />
          <UserDropdown
            avatar={data?.user!.image!}
            username={data?.user.username}
            email={data?.user.email!}
          />
        </header>
        <hr className="border-neutral-200 dark:border-neutral-800" />
        <div className="p-4">
          <h2 className="mb-3 text-lg font-medium ">
            {currentCollection ? currentCollection.name : 'All bookmarks'}
          </h2>
          <BookmarkList currentCollection={currentCollection} />
        </div>
      </main>
    </div>
  )
}
App.auth = true

export default App
