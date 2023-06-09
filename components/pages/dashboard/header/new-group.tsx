"use client"

import { Group } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface GroupData {
  name: Group["name"]
  slug: Group["slug"]
}

interface Props {
  serverAction: (data: FormData) => Promise<unknown>
}

// @see https://github.com/nextauthjs/next-auth/issues/7486
export default function NewGroupForm({ serverAction }: Props) {
  return (
    <>
      <h3>New Group</h3>
      <form action={serverAction} className="flex flex-col gap-2">
        <label>
          <p>Name</p>
          <Input name="name" />
        </label>
        <label>
          <p>Slug</p>
          <Input name="slug" />
        </label>
        <Button type="submit">Create</Button>
      </form>
    </>
  )
}
