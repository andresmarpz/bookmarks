import Image from 'next/image'

import ThemeChanger from '../../shared/theme-changer'
import UserDropdown from './user-dropdown'

interface Props {
  avatar: string
}

export default function Sidebar({ avatar }: Props) {
  return (
    <aside className="min-w-[250px] p-2">
      <div className="flex justify-between">
        <h1>bmrks</h1>

        <span className="flex items-center gap-2">
          <ThemeChanger />
          <UserDropdown avatar={avatar} />
        </span>
      </div>
    </aside>
  )
}
