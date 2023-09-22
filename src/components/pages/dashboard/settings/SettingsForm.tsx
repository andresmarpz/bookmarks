"use client"

import type { User } from "@prisma/client"

import { updateUserName, updateUserUsername } from "@/lib/action/user/user.actions"
import {
  updateUserNameSchema,
  updateUserUsernameSchema,
  type UpdateUserNameInput,
  type UpdateUserUsernameInput,
} from "@/lib/action/user/user.schema"
import SettingInput, {
  LoadingSettingInput,
} from "@/components/pages/dashboard/settings/SettingInput"

export function LoadingSettingsForm() {
  const skeletons = Array.from({ length: 2 }, (_, i) => (
    <LoadingSettingInput key={"sk-si-" + i} />
  ))

  return <div className="mt-2 flex flex-col gap-6">{skeletons}</div>
}

interface Props {
  user: User
}

export default function SettingsForm({ user }: Props) {
  return (
    <div className="mt-2 flex flex-col gap-6">
      <SettingInput<UpdateUserUsernameInput>
        name="Username"
        description="Your unique username on the site."
        property="username"
        defaultValue={user.username}
        resolver={updateUserUsernameSchema}
        action={updateUserUsername}
      />
      <SettingInput<UpdateUserNameInput>
        name="Your Name"
        description="Please enter your full name, or a name you are comfortable with."
        property="name"
        defaultValue={user.name}
        resolver={updateUserNameSchema}
        action={updateUserName}
      />
    </div>
  )
}
