"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { supabaseCCC } from "@/lib/supabase.client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function SignOutItem() {
  const router = useRouter()

  async function handleClick() {
    await supabaseCCC.auth.signOut()

    router.refresh()
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </DropdownMenuItem>
  )
}
