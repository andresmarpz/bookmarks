import { Suspense } from "react"

import { getSession } from "@/lib/auth/get-session"
import { getUser } from "@/lib/query/user.queries"
import DashboardPage from "@/components/pages/dashboard/DashboardPage"
import SettingsForm, {
  LoadingSettingsForm,
} from "@/components/pages/dashboard/settings/SettingsForm"

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
