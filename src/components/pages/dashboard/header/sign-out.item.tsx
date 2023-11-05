"use client"

import { LogOut } from "lucide-react"

import { signOut } from "@/lib/auth/sign-out"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function SignOutItem() {
  return (
    <DropdownMenuItem onClick={signOut}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </DropdownMenuItem>
  )
}
