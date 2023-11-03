"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { createClientComponentSupabase } from "@/lib/supabase/create-client-component.supabase"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function SignOutItem() {
  const router = useRouter()

  async function handleClick() {
    await createClientComponentSupabase().auth.signOut()

    router.refresh()
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </DropdownMenuItem>
  )
}
