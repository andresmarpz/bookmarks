import { Suspense } from "react"
import DashboardPage from "~/components/pages/dashboard/dashboard-page"
import SettingsForm, {
  LoadingSettingsForm,
} from "~/components/pages/dashboard/settings/settings-form"
import { getSession } from "~/lib/auth/get-session"
import { getUser } from "~/lib/query/user.queries"

export default async function SettingsPage() {
  const session = await getSession()
  const [user] = await getUser(session?.user?.id)

  return (
    <DashboardPage title="Settings">
      <Suspense fallback={<LoadingSettingsForm />}>
        <SettingsForm user={user} />
      </Suspense>
    </DashboardPage>
  )
}
