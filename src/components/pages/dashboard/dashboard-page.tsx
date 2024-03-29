import { Fragment, type PropsWithChildren } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/pages/dashboard/container"
import PageTitle from "@/components/pages/dashboard/page-title"

type Props = PropsWithChildren<{ title?: string }>
export default function DashboardPage({ title, children }: Props) {
  return (
    <Fragment>
      <PageTitle>
        {title ? <h1 className="text-xl">{title}</h1> : <Skeleton className="h-7 w-40" />}
      </PageTitle>
      <Container as="main" className="px-4">
        {children}
      </Container>
    </Fragment>
  )
}
