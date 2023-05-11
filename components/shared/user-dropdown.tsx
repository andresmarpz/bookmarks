'use client'

import Image from 'next/image'
import { useClerk, useUser } from '@clerk/nextjs'
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export default function UserDropdown() {
  const session = useUser()
  const { signOut, redirectToSignIn } = useClerk()

  const handleSignOut = async () =>
    signOut(() =>
      redirectToSignIn({
        afterSignInUrl: '/app'
      })
    )

  if (!session.isLoaded || !session.isSignedIn)
    return (
      <div className="flex gap-3 justify-center items-center rounded sm:py-1 sm:px-2 h-8 w-8 sm:w-40">
        <Skeleton className="w-8 h-8 sm:w-5 sm:h-5 rounded-full" />
        <Skeleton className="hidden sm:block w-[124px] h-[14px]" />
      </div>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="fade-in-5 p-0 sm:py-1 sm:px-2 rounded-full sm:rounded flex items-center gap-2 h-8 w-8 sm:w-40"
        >
          <Image
            className="w-7 h-7 sm:w-5 sm:h-5 rounded-full"
            width={28}
            height={28}
            src={session.user.profileImageUrl}
            alt=""
          />
          <span className="hidden sm:block text-sm text-neutral-800 dark:text-neutral-300 overflow-hidden whitespace-nowrap break-all text-ellipsis max-w-[100px] w-full">
            {session.user.username}
          </span>
          <ChevronsUpDownIcon className="hidden sm:block h-[14px] ml-1 text-neutral-700 dark:text-neutral-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={16} className="w-40">
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOutIcon className="h-[14px] w-[14px] mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
