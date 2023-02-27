import { useSession } from 'next-auth/react'

import Sidebar from '@/components/layout/Sidebar'

const App = () => {
  const { data } = useSession()

  return (
    <div className="flex">
      <Sidebar avatar={data?.user!.image!} />
      <main>
        <h1>App</h1>
      </main>
    </div>
  )
}
App.auth = true

export default App
