import { PropsWithChildren } from 'react'

import Header from '~/components/layout/header'

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
