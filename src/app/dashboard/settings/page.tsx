import { getSession } from "@/lib/auth/get-session"
import { getUser } from "@/lib/query/user.queries"
import DashboardPage from "@/components/pages/dashboard/DashboardPage"
import SettingsForm from "@/components/pages/dashboard/settings/SetingsForm"

export default async function SettingsPage() {
  const session = await getSession()
  const user = await getUser(session?.user.id)

  return (
    <DashboardPage title="Settings">
      <SettingsForm user={user!} />
    </DashboardPage>
  )
}
