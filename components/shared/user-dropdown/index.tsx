"use client"

import Image from "next/image"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  image: string
  email?: string
  username?: string
}

export default function UserDropdown({ image, email, username }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={image}
            width={20}
            height={20}
            alt="The avatar of your account"
          />
          <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {username ?? email ?? "unknown"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
