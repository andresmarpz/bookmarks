"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { AnyZodObject } from "zod"

import { Button } from "@/components/ui/button"
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

interface Props {
  name: string
  description?: string
  property: string
  resolver: AnyZodObject
  action: (data: any) => Promise<any>
}

export default function SettingForm({
  name,
  description,
  property,
  resolver,
  action,
}: Props) {
  const form = useForm({
    resolver: zodResolver(resolver),
  })

  const onSubmit = form.handleSubmit((data) => action(data))

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          name={property}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{name}</FormLabel>
              {description && <FormDescription></FormDescription>}
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />

              <Button type="submit">Save</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
