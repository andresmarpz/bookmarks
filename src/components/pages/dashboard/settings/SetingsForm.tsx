"use client"

import type { User } from "@prisma/client"

import { updateUserUsername } from "@/lib/action/user/user.actions"
import {
  updateUserUsernameSchema,
  type UpdateUserUsernameInput,
} from "@/lib/action/user/user.schema"
import SettingInput from "@/components/pages/dashboard/settings/SettingInput"

interface Props {
  user: User
}

export default function SettingsForm({ user }: Props) {
  return (
    <div>
      <SettingInput<UpdateUserUsernameInput>
        name="Username"
        description="Your unique username on the site."
        property="username"
        defaultValue={user.username}
        resolver={updateUserUsernameSchema}
        action={updateUserUsername}
      />
    </div>
  )
}
