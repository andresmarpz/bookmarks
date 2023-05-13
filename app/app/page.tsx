import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      protected!
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
