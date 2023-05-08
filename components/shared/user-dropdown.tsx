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
      <div className="flex gap-3 items-center rounded py-1 px-2 h-8">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-28 h-[14px]" />
      </div>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="py-1 px-2 rounded flex items-center gap-2 h-8"
        >
          <Image
            className="rounded-full"
            width={20}
            height={20}
            src={session.user.profileImageUrl}
            alt=""
          />
          <span className="flex items-center gap-4">
            <span className="text-sm text-neutral-800 dark:text-neutral-300">
              {session.user.username}
            </span>
            <ChevronsUpDownIcon className="h-[14px] w-[14px] text-neutral-700 dark:text-neutral-400" />
          </span>
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
