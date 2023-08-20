import type { PropsWithChildren } from "react"

export default async function Sidebar({ children }: PropsWithChildren) {
  return (
    <aside className="flex h-full w-2/12 min-w-[300px] flex-col py-6">
      {/* <div className="flex justify-center pt-4">
        <UserDropdown
          image={session!.user.image!}
          name={session!.user.name!}
          email={session!.user.email!}
          username={session!.user.username}
        />
      </div> */}
      {children}
    </aside>
  )
}
