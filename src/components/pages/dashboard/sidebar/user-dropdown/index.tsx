import Image from "next/image"
import Link from "next/link"
import { ChevronsUpDownIcon, LogOut } from "lucide-react"

import { getSession } from "@/lib/auth/get-session"
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

export function LoadingUserDropdown() {
  return <Skeleton className="h-10 w-full max-w-[200px]" />
}

export default async function UserDropdown() {
  const { user } = await getSession()
  const { name, username, email, image } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex w-full max-w-[200px] items-center justify-around gap-2"
        >
          <Image
            className="rounded-full"
            src={image ?? "/assets/default-avatar.png"}
            width={24}
            height={24}
            alt="The avatar of your account"
          />
          <span className="flex flex-col justify-center">
            <span className="text-bold max-w-[100px] truncate text-left text-xs leading-snug">
              {username ?? name}
            </span>
            <small className="max-w-[100px] truncate leading-tight text-gray-500">
              {email}
            </small>
          </span>
          <span>
            <ChevronsUpDownIcon className="h-3 w-3 text-gray-500" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        collisionPadding={16}
        sideOffset={8}
      >
        {!username && (
          <DropdownMenuLabel className="flex flex-col ">
            {username && <span className="text-bold">{username}</span>}
            <span className="w-[200px] truncate text-sm font-normal text-gray-400">
              {email}
            </span>
          </DropdownMenuLabel>
        )}
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
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
