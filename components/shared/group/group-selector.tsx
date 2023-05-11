'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Group } from '@/types/supabase'

interface Props {
  groups: Group[]
}

export default function GroupSelector({ groups }: Props) {
  if (!groups.length) return null

  return (
    <Select>
      <SelectTrigger className="flex items-center gap-2">
        <SelectValue placeholder="Select a group.." />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group) => (
          <SelectItem key={'select-' + group.slug} value={group.slug}>
            {group.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
