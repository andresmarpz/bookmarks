"use client"

import Image from "next/image"
import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Props {
  image: string
  email?: string
  username?: string
}

export default function UserDropdown({ image, email, username }: Props) {
  // return (
  //   <div className="flex gap-3 justify-center items-center rounded sm:py-1 sm:px-2 h-8 w-8 sm:w-40">
  //     <Skeleton className="w-8 h-8 sm:w-5 sm:h-5 rounded-full" />
  //     <Skeleton className="hidden sm:block w-[124px] h-[14px]" />
  //   </div>
  // )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 items-center gap-2 rounded-full p-0 fade-in-5 sm:w-40 sm:rounded sm:px-2 sm:py-1"
        >
          <Image
            className="h-7 w-7 rounded-full sm:h-5 sm:w-5"
            width={28}
            height={28}
            src={image}
            alt=""
          />
          <span className="hidden w-full max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap break-all text-sm text-neutral-800 dark:text-neutral-300 sm:block">
            {username || email || "unknown"}
          </span>
          <ChevronsUpDownIcon className="ml-1 hidden h-[14px] text-neutral-700 dark:text-neutral-400 sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={16} className="w-40">
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOutIcon className="mr-2 h-[14px] w-[14px]" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
