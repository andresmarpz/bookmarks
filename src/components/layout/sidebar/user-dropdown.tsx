import Image from 'next/image'
import Link from 'next/link'
import { LogOut, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { cn } from '~/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'

interface Props {
  avatar: string
  email: string
}

export default function UserDropdown({ avatar, email }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'rounded-full',
          'focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200'
        )}
      >
        <Image
          className="cursor-pointer rounded-full"
          width={24}
          height={24}
          src={avatar}
          alt="User profile image from GitHub"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit">
        <DropdownMenuLabel className="font-normal dark:text-neutral-500">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
