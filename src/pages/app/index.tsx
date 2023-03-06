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
      <Sidebar avatar={data?.user!.image!} />
      <main className="flex h-full w-full grow flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        <header className="flex items-center justify-between p-4">
          <NewBookmark />
          <UserDropdown
            avatar={data?.user!.image!}
            username={data?.user.username}
            email={data?.user.email!}
          />
        </header>
        <BookmarkList currentCollection={currentCollection} />
      </main>
    </div>
  )
}
App.auth = true

export default App
