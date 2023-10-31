import DashboardPage from "@/components/pages/dashboard/dashboard-page"
import { LoadingSettingsForm } from "@/components/pages/dashboard/settings/settings-form"

export default function LoadingSettings() {
  return (
    <DashboardPage title="Settings">
      <LoadingSettingsForm />
    </DashboardPage>
  )
}
