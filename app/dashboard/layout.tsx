import { type PropsWithChildren } from "react"
import { type Metadata } from "next"

import Sidebar from "@/components/pages/dashboard/sidebar/Sidebar"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="grow p-4 py-6">{children}</main>
    </div>
  )
}
