import { useMemo, useState } from 'react'
import mql, { MicrolinkError } from '@microlink/mql'
import { Edit2, Indent, Link, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateBookmark } from '~/server/api/routers/bookmark/use-create-bookmark'
import useCollections from '~/server/api/routers/collection/use-collections'

import { RouterInputs } from '~/lib/api'
import mapMicrolinkErrorToMessage from '~/lib/microlink-errors'
import Spinner from '~/components/shared/spinner'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { SelectItem, SelectSeparator } from '~/components/ui/select'
import { Button } from '../button'
import InputField from '../form/input-field'
import SelectField from '../form/select-field'

type FormValues = {
  url: string
  title?: string
  description?: string
  collection?: string
}

export default function NewBookmark() {
  const { data } = useCollections()
  const collections = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data?.pages]
  )

  const { mutate, isLoading } = useCreateBookmark()
  const { handleSubmit, register, setValue, reset } = useForm<FormValues>()

  const [loading, setLoading] = useState(isLoading)
  const [open, setOpen] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    try {
      const {
        data: { title, description, logo }
      } = await mql(data.url)

      const input: RouterInputs['bookmark']['createBookmark'] = {
        url: data.url,
        title: data.title || title || undefined,
        description: data.description || description || undefined,
        favicon: logo?.url,
        collectionId:
          data.collection === 'undefined' ? undefined : data.collection
      }

      mutate(input, {
        onSettled: (newBookmark) => {
          if (!newBookmark) return

          reset()
          setOpen(false)
          toast('Bookmark created successfully', {
            description: newBookmark.title ?? 'Untitled'
          })
        }
      })
    } catch (error) {
      if (error instanceof MicrolinkError) {
        const microlinkError = error as MicrolinkError

        toast(mapMicrolinkErrorToMessage(microlinkError))
      }
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
