import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, LogOut, Settings } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { cn } from '~/lib/utils'
import { Button } from '~/components/shared/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'

interface Props {
  avatar?: string
  username?: string
  email?: string
}

export default function UserDropdown({ avatar, username, email }: Props) {
  if (!email) return <Button onClick={() => signIn()}>Sign in</Button>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-2 rounded-md p-2',
          'hover:border-gray-400 dark:hover:border-neutral-500',
          'duration-50 transition-all ease-linear',
          'hover:bg-gray-200 dark:hover:bg-neutral-800',
          'select-none'
        )}
      >
        <Image
          className="cursor-pointer rounded-full"
          width={24}
          height={24}
          src={avatar!}
          alt="User profile image from GitHub"
        />
        <span className="flex items-center gap-1">
          <span className="w-max max-w-[175px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {username ? username : email}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-neutral-500" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit" collisionPadding={16}>
        <DropdownMenuLabel className="font-normal dark:text-neutral-500">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuItem className="py-0">
          <Link
            href="/settings"
            className="flex w-full items-center gap-2 py-1.5"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
