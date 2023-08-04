"use client"

import { FormEvent, useTransition } from "react"
import mql from "@microlink/mql"

import {
  createBookmark,
  CreateBookmarkInput,
} from "@/lib/actions/bookmark/create-bookmark"
import { Input } from "@/components/ui/input"

interface Props {
  slug: string
}

export default function NewBookmark({ slug }: Props) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget)) as Pick<
      CreateBookmarkInput,
      "url"
    >

    startTransition(async () => {
      const {
        data: { logo, title, description },
      } = await mql(data.url)

      await createBookmark({
        title: title ?? undefined,
        description: description ?? undefined,
        url: data.url,
        image: logo?.url ?? undefined,
        group: slug,
      })
    })
  }

  return (
    // <Form.Root className="my-4" onSubmit={handleSubmit}>
    //   <Form.Field name="url">
    //     <Form.Label />
    //     <Form.Control asChild>
    //       <Input
    //         required
    //         disabled={isPending}
    //         placeholder="Insert a new link.."
    //       />
    //     </Form.Control>
    //   </Form.Field>
    // </Form.Root>
    <form></form>
  )
}
