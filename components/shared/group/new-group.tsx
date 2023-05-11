'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { PlusIcon } from 'lucide-react'

interface Props {
  expanded: boolean
}

export default function NewGroup({ expanded }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={clsx('py-2 px-3', expanded ? 'w-52' : 'w-10')}
        >
          <PlusIcon className={clsx('h-4 w-4', expanded && 'mr-2')} />
          {expanded && <span>Create new group</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Group</DialogTitle>
        </DialogHeader>
        <DialogDescription>Form to creat a n ew group</DialogDescription>
        <DialogFooter>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
