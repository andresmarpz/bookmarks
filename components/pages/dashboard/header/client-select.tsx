"use client"

import React, { forwardRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Group } from "@prisma/client"

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
}

export default function ClientSelect({ groups }: Props) {
  const router = useRouter()
  // there is a middleware to prevent this route from being accessed
  // if the slug param is not defined (user is redirected to /app/all)
  const params = useParams() as { slug: string }

  const { slug } = params

  return (
    <Select
      value={slug}
      onValueChange={(value) => router.push(`/app/${value}`)}
    >
      <SelectTrigger className="w-36" defaultValue="all">
        <span className="flex w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {slug === "all" ? "All" : <SelectValue />}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectSeparator />
        {groups.map((group) => (
          <SelectableItem
            key={"s-i-" + group.slug}
            value={group.slug}
            onMouseOver={() => router.prefetch(`/app/${group.slug}`)}
          >
            {group.name}
          </SelectableItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const SelectableItem = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectItem>
>((props, forwardedRef) => {
  const [isPrefetched, setIsPrefetched] = useState(false)

  return (
    <SelectItem
      ref={forwardedRef}
      {...props}
      onMouseOver={(event) => {
        if (isPrefetched) return

        props.onMouseOver?.(event)
        setIsPrefetched(true)
      }}
    />
  )
})
SelectableItem.displayName = "SelectableItem"
