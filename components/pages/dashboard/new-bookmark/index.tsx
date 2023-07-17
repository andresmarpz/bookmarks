"use client"

import { FormEvent, useTransition } from "react"
import mql from "@microlink/mql"
import * as Form from "@radix-ui/react-form"

import { Input } from "@/components/ui/input"

import { createBookmark, CreateBookmarkInput } from "./action"

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

    const {
      data: { logo, title, description },
    } = await mql(data.url)

    startTransition(async () => {
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
    <Form.Root onSubmit={handleSubmit}>
      <Form.Field name="url">
        <Form.Label />
        <Form.Control asChild>
          <Input required disabled={isPending} />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  )
}
