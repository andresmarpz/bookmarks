"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import type { Group } from "@prisma/client"
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { createGroup } from "@/lib/action/group/group.actions"
import { commandScore } from "@/lib/command-score"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command-menu"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  groups: Group[]
}

export default function GroupSwitcher({ groups }: Props) {
  const [open, setOpen] = useState(false)
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false)

  // there is a middleware to prevent this route from being accessed
  // if the slug param is not defined (user is redirected to /app/all)
  const { slug } = useParams() as { slug: string }
  const currentGroup = groups.find((group) => group.slug === slug)

  const router = useRouter()

  const form = useForm<{
    name: string
    slug: string
  }>()

  const onSubmit = form.handleSubmit(async (data) => {
    await createGroup(data)
    setShowNewGroupDialog(false)
  })

  /**
   *  Map groups to an object with the group id as key
   *  This is used to get the group name and slug from the group id
   *  when filtering, to avoid traversing the groups array every time
   *  using memory instead.
   */
  const groupMap = useMemo(
    () =>
      groups.reduce(
        (prev, { slug, name, id }) => {
          prev[id] = { slug, name }
          return prev
        },
        {} as { [K: Group["id"]]: { name: string; slug: string } }
      ),
    [groups]
  )
  console.log(groupMap)

  return (
    <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a group"
            className="w-[200px] justify-between"
          >
            {currentGroup?.name ?? slug === "all" ? "All" : "Undefined"}
            <ChevronsUpDownIcon className="h-3 w-3 text-neutral-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value, search) => {
              if (!search) return 1
              if (value.startsWith("visible")) return 1
              const name = groupMap[value].name
              const slug = groupMap[value].slug
              return (
                (commandScore(name, search) + commandScore(slug, search)) / 2
              )
            }}
          >
            <CommandList>
              <CommandInput placeholder="Search group.." />
              <CommandEmpty>No group found.</CommandEmpty>
              <CommandGroup heading="Groups">
                {groups.map((group) => (
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      router.push(`/app/${group.slug}`)
                    }}
                    className="text-sm"
                    key={group.id}
                    value={group.id}
                  >
                    <Link
                      className="pointer-events-none flex w-full items-center justify-between"
                      href={group.slug}
                    >
                      {group.name}
                      {slug === group.slug ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : null}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandGroup>
              <DialogTrigger asChild>
                <CommandItem
                  value="visible-newgroup"
                  onSelect={() => {
                    setOpen(false)
                    setShowNewGroupDialog(true)
                  }}
                >
                  <PlusCircleIcon className="mr-2 h-5 w-5" />
                  Create Group
                </CommandItem>
              </DialogTrigger>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogTitle>Create Group</DialogTitle>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The slug is used to create a unique URL for your group.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-10" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
