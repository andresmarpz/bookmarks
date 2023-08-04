import { PropsWithChildren } from "react"
import { Metadata } from "next"

import Sidebar from "@/components/pages/dashboard/sidebar/Sidebar"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="grow">{children}</main>
    </div>
  )
}
