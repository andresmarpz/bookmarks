import { PropsWithChildren } from 'react'
import { useSession } from 'next-auth/react'

export default function Auth({ children }: PropsWithChildren) {
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
