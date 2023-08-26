import { Fragment, type PropsWithChildren } from "react"

import PageTitle from "@/components/pages/dashboard/PageTitle"
import Container from "@/components/pages/dashboard/container"

type Props = PropsWithChildren<{ title: string }>
export default function DashboardPage({ title, children }: Props) {
  return (
    <Fragment>
      <PageTitle>
        <h1 className="text-xl">{title}</h1>
      </PageTitle>
      <Container as="main">{children}</Container>
    </Fragment>
  )
}
