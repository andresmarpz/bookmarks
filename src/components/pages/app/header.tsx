import { useSession } from 'next-auth/react'

import UserDropdown from '~/components/layout/sidebar/user-dropdown'
import NewBookmark from '~/components/shared/new-bookmark'

export default function Header() {
  const { data } = useSession()

  return (
    <header className="flex items-center justify-end p-4">
      <UserDropdown
        avatar={data?.user!.image!}
        username={data?.user.username}
        email={data?.user.email!}
      />
    </header>
  )
}
