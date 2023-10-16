import Image from "next/image"
import Link from "next/link"
import { ChevronsUpDownIcon } from "lucide-react"

import { getSession } from "@/lib/auth/get-session"
import { getUser } from "@/lib/query/user.queries"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import SignOutItem from "@/components/pages/dashboard/header/user-dropdown/sign-out.item"

export function LoadingUserDropdown() {
  return <Skeleton className="h-10 w-full max-w-[200px]" />
}

export default async function UserDropdown() {
  const session = await getSession()

  const [{ name, email, username, avatar }] = await getUser(session.user.id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex max-w-[200px] items-center justify-around gap-2"
        >
          <Image
            className="rounded-full"
            src={avatar ?? "/assets/default-avatar.jpg"}
            width={24}
            height={24}
            alt="The avatar of your account"
          />
          <span className="text-bold max-w-[100px] truncate px-2 text-left text-xs leading-snug">
            {username ?? name}
          </span>
          <span>
            <ChevronsUpDownIcon className="h-3 w-3 text-gray-500" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" collisionPadding={16} sideOffset={8}>
        <DropdownMenuLabel className="flex flex-col">
          <span className="max-w-[176px] truncate text-sm font-normal text-gray-400">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/settings">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
