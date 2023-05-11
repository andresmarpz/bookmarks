import GroupSelector from '@/components/shared/group/group-selector'
import NewGroup from '@/components/shared/group/new-group'
import { supabase } from '@/lib/supabase'

export default async function GroupContainer() {
  const db = await supabase()
  const { data, error } = await db.from('groups').select('*')

  const isEmpty = !data?.length

  return (
    <span className="flex gap-2 animate-fade-in">
      <GroupSelector groups={data ?? []} />
      <NewGroup expanded={isEmpty} />
    </span>
  )
}
