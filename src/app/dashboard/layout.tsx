import { type PropsWithChildren } from "react"
import { type Metadata } from "next"

import Header from "@/components/pages/dashboard/header/Header"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="w-full grow bg-[#111]">{children}</div>
    </div>
  )
}
