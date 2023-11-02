"use client"

import { useState, useTransition } from "react"
import type { Group } from "@/db/schema/group.entity"
import { zodResolver } from "@hookform/resolvers/zod"
import mql from "@microlink/mql"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createBookmark } from "@/lib/action/bookmark/bookmark.actions"
import { createBookmarkSchema } from "@/lib/action/bookmark/bookmark.schema"
import Spinner from "@/components/ui/Spinner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  groups: Group[]
  currentGroup: Pick<Group, "slug" | "id">
}

const formSchema = createBookmarkSchema.pick({
  title: true,
  description: true,
  url: true,
  groupSlug: true,
})
type FormFields = z.infer<typeof formSchema>

export default function NewBookmark({ groups, currentGroup }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormFields>({
    defaultValues: {
      groupSlug: currentGroup.slug,
      title: "",
      url: "",
      description: "",
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const {
        data: { logo, title, description },
      } = await mql(data.url)

      await createBookmark({
        title: data.title || title || undefined,
        description: data.description || description || undefined,
        url: data.url,
        image: logo?.url ?? undefined,
        groupId: groups.find((group) => group.slug === data.groupSlug)?.id!,
        groupSlug: data.groupSlug,
      })

      setIsDialogOpen(false)
    })
  })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 rounded-lg border bg-neutral-800 px-4 py-0 text-sm text-gray-100 shadow-md shadow-neutral-800/70 transition-colors hover:bg-neutral-700 hover:text-gray-50"
        >
          <PlusIcon className="mr-2 h-3 w-3" /> New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Select>
          <DialogTitle>New Bookmark</DialogTitle>
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="groupSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group.." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectSeparator />
                        {groups.map((group) => (
                          <SelectItem key={"sl" + group.slug} value={group.slug}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="sm" variant="default" disabled={isPending}>
                {!isPending ? "Create" : <Spinner />}
              </Button>
            </form>
          </Form>
        </Select>
      </DialogContent>
    </Dialog>
  )
}
