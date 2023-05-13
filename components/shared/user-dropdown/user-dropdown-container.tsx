import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserDropdown from '@/components/shared/user-dropdown'
import { getServerSession } from 'next-auth'

export default async function UserDropdownContainer() {
  const session = await getServerSession(authOptions)

  return (
    <UserDropdown
      image={session!.user?.image!}
      email={session!.user?.email!}
      username={session!.user?.username!}
    />
  )
}
