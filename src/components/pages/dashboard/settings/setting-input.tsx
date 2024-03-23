"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type DefaultValues, type FieldValues, type Path } from "react-hook-form"
import type { AnyZodObject } from "zod"

import { Button } from "~/components/ui/button"
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
import { Skeleton } from "~/components/ui/skeleton"
import Spinner from "~/components/ui/Spinner"

interface Props<Data> {
  name: string
  description?: string
  property: Path<Data>
  defaultValue: any
  resolver: AnyZodObject
  action: (data: Data) => Promise<any>
}

export function LoadingSettingInput() {
  return (
    <div className="rounded-md border bg-black p-5">
      <Skeleton className="h-7 w-1/2" />

      <Skeleton className="mt-4 h-5 w-1/3" />
      <Skeleton className="mt-2 h-8 w-full" />

      <Skeleton className="float-right my-4 h-10 w-24" />
    </div>
  )
}

export default function SettingInput<T extends FieldValues>({
  name,
  description,
  property,
  defaultValue,
  resolver,
  action,
}: Props<T>) {
  const form = useForm<T>({
    resolver: zodResolver(resolver),
    defaultValues: {
      [property]: defaultValue ?? "",
    } as DefaultValues<T>,
  })

  const onSubmit = form.handleSubmit((data) => action(data))

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="rounded-md border bg-black p-5">
        <FormField
          name={property}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">{name}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
              <FormControl>
                <Input {...field} />
              </FormControl>
              <div className="flex items-center justify-between py-3">
                {!form.formState.errors[property] ? <span /> : <FormMessage />}

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="py-0"
                >
                  {form.formState.isSubmitting ? <Spinner /> : "Save"}
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
