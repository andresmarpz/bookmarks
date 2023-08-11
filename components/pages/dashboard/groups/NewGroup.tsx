"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { createGroup } from "@/lib/action/group/group.actions"
import { createGroupSchema } from "@/lib/action/group/group.schema"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Spinner from "@/components/ui/Spinner"

type FormFields = z.infer<typeof createGroupSchema>
export default function NewGroup() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormFields>({
    resolver: zodResolver(createGroupSchema),
  })

  const onSubmit = form.handleSubmit(({ name, slug }) => {
    startTransition(async () => {
      await createGroup({
        name,
        slug,
      })

      setIsDialogOpen(false)
    })
  })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Group</DialogTitle>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
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
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="sm"
              variant="default"
              disabled={isPending}
            >
              {!isPending ? "Create" : <Spinner />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
