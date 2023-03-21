import { forwardRef, useState } from 'react'
import mql, { MicrolinkError } from '@microlink/mql'
import { Bookmark } from '@prisma/client'
import { InfiniteData } from '@tanstack/react-query'
import { TRPCClientError } from '@trpc/client'
import { Edit2, Indent, Link, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useCollections from '~/hooks/use-collections'

import { RouterInputs, RouterOutputs, api } from '~/lib/api'
import Spinner from '~/components/shared/spinner'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Button } from '../button'
import InputField from '../form/input-field'

type FormValues = {
  url: string
  title?: string
  description?: string
  collection?: string
}

const SelectField = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Select>
>(({ children, ...props }, ref) => {
  return (
    <Select {...props}>
      <SelectTrigger ref={ref}>
        <SelectValue placeholder="Select a collection" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
})
SelectField.displayName = 'SelectField'

interface Props {
  queryInput: RouterInputs['bookmark']['getBookmarks']
  onMutationError: (
    previousData?: InfiniteData<RouterOutputs['bookmark']['getBookmarks']>
  ) => void
  onMutationSettled: () => void
}

export default function NewBookmark({
  queryInput,
  onMutationError,
  onMutationSettled
}: Props) {
  const context = api.useContext()

  const { mutate, isLoading } = api.bookmark.createBookmark.useMutation({
    onMutate: async (newBookmark) => {
      context.bookmark.getBookmarks.cancel()

      const previousData =
        context.bookmark.getBookmarks.getInfiniteData(queryInput)
      context.bookmark.getBookmarks.setInfiniteData(queryInput, (old) => {
        if (!old) return old

        const dummyNewBookmark: Bookmark = {
          ...newBookmark,
          createdAt: new Date(),
          updatedAt: new Date(),
          sortIndex: -1,
          userId: crypto.randomUUID(),
          id: newBookmark.id ?? crypto.randomUUID(),
          title: newBookmark.title ?? null,
          description: newBookmark.description ?? null,
          favicon: newBookmark.favicon ?? null,
          collectionId: newBookmark.collectionId ?? null
        }

        return {
          ...old,
          pages: old.pages.map((page, index) =>
            index + 1 === old.pages.length
              ? {
                  ...page,
                  items: [dummyNewBookmark, ...page.items]
                }
              : page
          )
        }
      })

      return previousData
    },
    onError: (error, newBookmark, ctx) => onMutationError(ctx),
    onSettled: () => onMutationSettled()
  })
  const { handleSubmit, register, setValue, reset } = useForm<FormValues>()

  const { collections } = useCollections()

  const [loading, setLoading] = useState(isLoading)
  const [open, setOpen] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    try {
      const {
        data: { title, description, logo }
      } = await mql(data.url)

      mutate({
        id: crypto.randomUUID() || undefined,
        url: data.url,
        title: data.title || title || undefined,
        description: data.description || description || undefined,
        favicon: logo?.url,
        collectionId:
          data.collection === 'undefined' ? undefined : data.collection
      })
      setOpen(false)
      reset()
    } catch (error) {
      if (error instanceof MicrolinkError) {
        const microlinkError = error as MicrolinkError

        console.error(microlinkError.message)
      }

      console.log((error as any).data?.zodError?.fieldErrors)
    } finally {
      setLoading(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> <span>New Bookmark</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Bookmark</DialogTitle>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <InputField
            label="URL*"
            placeholder="nextjs.org"
            {...register('url', { required: true })}
            pre={<Link className="h-4 w-4 text-neutral-500" />}
          />
          <InputField
            label="Title"
            placeholder="Next.js by Vercel - The React Framework"
            {...register('title')}
            pre={<Edit2 className="h-4 w-4 text-neutral-500" />}
          />
          <InputField
            label="Description"
            placeholder="Next.js is a production-ready framework for building fast and powerful web applications."
            {...register('description')}
            pre={<Indent className="h-4 w-4 text-neutral-500" />}
          />
          <label>
            <span className="mb-2 block text-sm text-neutral-500">
              Collection
            </span>
            <SelectField
              onValueChange={(value) => setValue('collection', value)}
              defaultValue={'undefined'}
              {...register('collection')}
            >
              <SelectItem value="undefined">All</SelectItem>
              <SelectSeparator />
              {collections?.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.name}
                </SelectItem>
              ))}
            </SelectField>
          </label>

          <Button
            type="submit"
            className="m-auto h-10 w-full max-w-[175px] py-0"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
