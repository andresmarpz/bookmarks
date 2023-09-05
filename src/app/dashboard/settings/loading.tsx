import DashboardPage from "@/components/pages/dashboard/DashboardPage"
import { LoadingSettingsForm } from "@/components/pages/dashboard/settings/SettingsForm"

export default function LoadingSettings() {
  return (
    <DashboardPage title="Settings">
      <LoadingSettingsForm />
    </DashboardPage>
  )
}
