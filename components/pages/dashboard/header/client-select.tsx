"use client"

import { forwardRef, useRef, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Group } from "@prisma/client"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NewGroupForm from "@/components/pages/dashboard/header/new-group"

interface Props {
  groups: Group[]
  newGroupAction: (data: FormData) => Promise<any>
}

export default function ClientSelect({ groups, newGroupAction }: Props) {
  // there is a middleware to prevent this route from being accessed
  // if the slug param is not defined (user is redirected to /app/all)
  const params = useParams() as { slug: string }

  const { slug } = params
  const groupName = groups.find((group) => group.slug === slug)?.name

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)
  const focusRef = useRef<HTMLElement | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)

  function handleDialogItemSelect(event: Event) {
    event.preventDefault()
    focusRef.current = dropdownTriggerRef.current
  }

  function handleDialogItemOpenChange(open: boolean) {
    setDialogOpen(open)
    if (open === false) setDropdownOpen(false)
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" ref={dropdownTriggerRef}>
          <span className="flex w-[100px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap">
            {slug === "all" ? "All" : groupName}
            <ChevronsUpDown className="h-3 w-3 text-neutral-500" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-[371px] w-36 overflow-y-auto"
        loop
        hidden={dialogOpen}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus()
            focusRef.current = null
            event.preventDefault()
          }
        }}
      >
        <Dialog onOpenChange={handleDialogItemOpenChange}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer transition-none"
              onSelect={handleDialogItemSelect}
            >
              <Plus className="mr-2 h-3 w-3" /> New Group
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent onCloseAutoFocus={(event) => event.preventDefault()}>
            <NewGroupForm serverAction={newGroupAction} />
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Groups</DropdownMenuLabel>
          <Item name="All" slug="all" selected={slug === "all"} />
          {groups.map((group) => (
            <Item
              key={group.id}
              name={group.name}
              slug={group.slug}
              selected={slug === group.slug}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type ItemProps = React.ComponentProps<typeof DropdownMenuItem> & {
  name: Group["name"]
  slug: Group["slug"]
  selected: boolean
}
const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ name, slug, selected, ...props }, forwardedRef) => {
    return (
      <DropdownMenuItem
        className="transition-none"
        asChild
        {...props}
        ref={forwardedRef}
      >
        <Link
          className="flex cursor-pointer items-center justify-between"
          href={`/app/${slug}`}
        >
          {name} {selected && <Check className="h-3 w-3" />}
        </Link>
      </DropdownMenuItem>
    )
  }
)
Item.displayName = "DropdownItem"
