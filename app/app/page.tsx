import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <div className="m-2 p-10">
      protected!
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
