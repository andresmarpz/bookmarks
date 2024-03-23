"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon, Trash } from "lucide-react"
import { useForm } from "react-hook-form"

import { createGroup, deleteGroup } from "~/lib/action/group/group.actions"
import { createGroupSchema } from "~/lib/action/group/group.schema"
import { commandScore } from "~/lib/command-score"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command-menu"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import type { Group } from "~/db/schema/group.entity"

interface Props {
  groups: Group[]
}

export default function GroupSwitcher({ groups }: Props) {
  const [open, setOpen] = useState(false)
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false)

  const [showDeleteGroupDialog, setShowDeleteGroupDialog] = useState(false)

  // there is a middleware to prevent this route from being accessed
  // if the slug param is not defined (user is redirected to /app/all)
  const { slug } = useParams() as { slug: string }
  const currentGroup = groups.find((group) => group.slug === slug)

  const router = useRouter()

  const form = useForm<{
    name: string
    slug: string
  }>({
    defaultValues: {
      name: "",
      slug: "",
    },
    resolver: zodResolver(createGroupSchema),
  })

  const deleteGroupForm = useForm<{
    keepBookmarks: boolean
  }>({
    defaultValues: {
      keepBookmarks: true,
    },
  })

  const onCreateGroup = form.handleSubmit(async (data) => {
    console.log(data)
    await createGroup(data)
    setShowNewGroupDialog(false)
  })

  const onDeleteGroup = deleteGroupForm.handleSubmit(async (data) => {
    console.log(data)
    await deleteGroup({
      id: currentGroup!.id,
    })
    setShowDeleteGroupDialog(false)
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

  return (
    <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
      <AlertDialog open={showDeleteGroupDialog} onOpenChange={setShowDeleteGroupDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a group"
              className="w-[200px] justify-between"
            >
              {currentGroup?.name ?? "Go to group.."}
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
                return (commandScore(name, search) + commandScore(slug, search)) / 2
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
                        router.push(`/dashboard/group/${group.slug}`)
                      }}
                      className="text-sm"
                      key={group.id}
                      value={group.id}
                    >
                      <Link
                        className="pointer-events-none flex w-full items-center justify-between"
                        href={`/dashboard/group/group.slug`}
                      >
                        {group.name}
                        {slug === group.slug ? <CheckIcon className="h-4 w-4" /> : null}
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
                    className="text-sm"
                  >
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    New Group
                  </CommandItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <CommandItem
                    className="text-red-400 aria-disabled:opacity-60 aria-selected:text-red-300"
                    value="visible-deletegroup"
                    onSelect={() => {
                      setOpen(false)
                      setShowDeleteGroupDialog(true)
                    }}
                    disabled={!currentGroup}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete {currentGroup?.name ?? "Group"}
                  </CommandItem>
                </AlertDialogTrigger>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <AlertDialogContent>
          <Form {...deleteGroupForm}>
            <form onSubmit={onDeleteGroup}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete Group <span className="font-bold">asd</span>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You can decide whether to keep the
                  bookmarks in the <code>All</code> section or delete them.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="mt-8 flex items-center justify-between">
                <FormField
                  name="keepBookmarks"
                  control={deleteGroupForm.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Keep bookmarks</FormLabel>
                    </FormItem>
                  )}
                />
                <span className="flex items-center gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit">Delete</AlertDialogAction>
                </span>
              </div>
            </form>
          </Form>
        </AlertDialogContent>

        <DialogContent>
          <DialogTitle>New Group</DialogTitle>
          <Form {...form}>
            <form onSubmit={onCreateGroup}>
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
      </AlertDialog>
    </Dialog>
  )
}
