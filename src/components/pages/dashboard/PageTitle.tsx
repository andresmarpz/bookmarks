import type { PropsWithChildren } from "react"

import Container from "@/components/pages/dashboard/container"

export default function PageTitle({ children }: PropsWithChildren) {
  return (
    <div className="border-b border-b-neutral-700 bg-black">
      <Container className="py-8">{children}</Container>
    </div>
  )
}
