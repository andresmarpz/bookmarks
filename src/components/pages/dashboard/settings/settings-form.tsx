"use client"

import SettingInput, {~/
  LoadingSettingInput,
} from "~/components/pages/dashboard/settings/setting-input"
import type { User } from "~/db/schema/user.entity"
import { updateUserName, updateUserUsername } from "~/lib/action/user/user.actions"
import {
  update~/erNameSchema,
  updateUserUsernameSchema,
  type UpdateUserNameInput,
  type U~/ateUserUsernameInput,
} from "~/lib/action/user/u~/r.schema"

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
