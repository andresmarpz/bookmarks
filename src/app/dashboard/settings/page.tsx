import { getSession } from "@/lib/auth/get-session"
import DashboardPage from "@/components/pages/dashboard/DashboardPage"

export default async function SettingsPage() {
  const session = await getSession()
  console.log(session)

  return (
    <DashboardPage title="Settings">
      {/* <SettingForm name="Username"
        description="Your unique @username on the site."
        property="username"
        action={updateUserUsername}
      /> */}
    </DashboardPage>
  )
}
