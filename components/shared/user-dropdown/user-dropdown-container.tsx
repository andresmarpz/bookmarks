import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import UserDropdown from "@/components/shared/user-dropdown"

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
