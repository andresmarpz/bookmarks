import Sidebar from '~/components/layout/sidebar'
import Main from '~/components/pages/app/main'

const App = () => {
  return (
    <div className="flex h-screen items-stretch">
      <Sidebar />
      <main className="flex h-full w-full grow flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        <Main />
      </main>
    </div>
  )
}
App.auth = true

export default App
