'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

export default function ClientProviders({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
