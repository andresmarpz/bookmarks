import { useSession } from 'next-auth/react'

import Sidebar from '@/components/layout/sidebar'
import NewBookmark from '@/components/shared/new-bookmark'

const App = () => {
  const { data } = useSession()

  return (
    <div className="flex">
      <Sidebar avatar={data?.user!.image!} />
      <main className="p-2">
        <NewBookmark />
      </main>
    </div>
  )
}
App.auth = true

export default App
