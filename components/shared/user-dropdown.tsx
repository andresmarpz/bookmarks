'use client'

import Image from 'next/image'
import { useClerk, useUser } from '@clerk/nextjs'

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

  const handleSignOut = async () => {
    signOut(() =>
      redirectToSignIn({
        afterSignInUrl: '/app'
      })
    )
  }

  if (!session.isLoaded || !session.isSignedIn)
    return (
      <div className="flex gap-3 items-center rounded py-1 px-2">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-28 h-[14px]" />
      </div>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="py-1 px-2 rounded flex items-center gap-3">
          <Image
            className="rounded-full"
            width={20}
            height={20}
            src={session.user.profileImageUrl}
            alt=""
          />
          <span className="text-sm text-secondary-foreground">
            {session.user.username}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={16} className="w-40">
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
