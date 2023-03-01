import { Edit2, Indent, Link, Loader, Loader2, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cn } from '~/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { Button } from '../button'
import InputField from '../form/input-field'

export default function NewBookmark() {
  const { handleSubmit, register } = useForm()

  const onSubmit = () => {}

  return (
    <Dialog>
      <DialogTrigger className={cn('flex items-center gap-2', 'rounded p-2')}>
        <PlusIcon /> <span>New Bookmark</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Bookmark</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            label="URL*"
            placeholder="nextjs.org"
            register={register('url', { required: true })}
            pre={<Link className="h-4 w-4 text-neutral-500" />}
          />
          <InputField
            label="Title"
            placeholder="Next.js by Vercel - The React Framework"
            register={register('title')}
            pre={<Edit2 className="h-4 w-4 text-neutral-500" />}
          />
          <InputField
            label="Description"
            placeholder="Next.js is a production-ready framework for building fast and powerful web applications."
            register={register('description')}
            pre={<Indent className="h-4 w-4 text-neutral-500" />}
          />

          <Button type="submit" className="m-auto w-full max-w-[175px]">
            Create <Loader /> <Loader2 />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
