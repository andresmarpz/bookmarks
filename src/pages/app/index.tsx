import Sidebar from '~/components/layout/sidebar'
import Header from '~/components/pages/app/header'
import Main from '~/components/pages/app/main'

const App = () => {
  return (
    <div className="flex h-screen items-stretch">
      <Sidebar />
      <main className="flex h-full w-full grow flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        <Header />
        <hr className="border-neutral-200 dark:border-neutral-800" />
        <Main />
      </main>
    </div>
  )
}
App.auth = true

export default App
