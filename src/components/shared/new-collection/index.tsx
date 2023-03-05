import { Pencil, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { api } from '~/lib/api'
import { cn } from '~/lib/utils'
import { Button } from '~/components/shared/button'
import InputField from '~/components/shared/form/input-field'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'

type FormValues = {
  name: string
}

export default function NewCollection() {
  const { mutate } = api.collection.createCollection.useMutation()

  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      name: data.name
    })
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-md py-2',
            'text-gray-50',
            'bg-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-700',
            'border border-neutral-800 hover:border-neutral-600 dark:border-neutral-700 dark:hover:border-neutral-600',
            'transition-colors duration-150 ease-in-out'
          )}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="text-sm">New Collection</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Collection</DialogTitle>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <InputField
            label="Name"
            pre={<Pencil className="h-4 w-4 text-neutral-500" />}
            {...register('name', { required: true })}
          />

          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
