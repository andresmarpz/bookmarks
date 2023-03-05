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
    <div className="flex min-h-screen items-stretch">
      <Sidebar avatar={data?.user!.image!} />
      <main className="flex w-full grow flex-col bg-slate-50 dark:bg-black">
        <header className="flex items-center justify-between p-4">
          <NewBookmark />
          <UserDropdown avatar={data?.user!.image!} email={data?.user.email!} />
        </header>
        <BookmarkList currentCollection={currentCollection} />
      </main>
    </div>
  )
}
App.auth = true

export default App
