"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronsUpDownIcon, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  image: string
  name?: string
  email?: string
  username?: string
}

export default function UserDropdown({ image, name, email, username }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={image}
            width={24}
            height={24}
            alt="The avatar of your account"
          />
          <span className="flex flex-col justify-center">
            <span className="text-bold text-left text-xs leading-snug">
              {username ?? name}
            </span>
            <small className="leading-tight text-gray-500">{email}</small>
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
