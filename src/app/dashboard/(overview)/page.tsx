import DashboardPage from "@/components/pages/dashboard/dashboard-page"
import GroupList from "@/components/pages/dashboard/groups/group-list"

export default function Overview() {
  return (
    <DashboardPage title="Overview">
      <section>
        <GroupList />
      </section>
    </DashboardPage>
  )
}
