import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"
import { Input } from "@/components/ui/input"

interface Props {
  slug: string
}

export default async function NewBookmark({ slug }: Props) {
  async function newBookmark(data: FormData) {
    "use server"

    const session = await getServerSession(authOptions)

    await prisma.bookmark.create({
      data: {
        title: (data.get("title") as string) ?? "Untitled",
        url: data.get("content") as string,
        description: data.get("description") as string,
        group: {
          connect: {
            slug,
          },
        },
        user: {
          connect: {
            uid: session!.user.uid,
          },
        },
      },
    })

    revalidatePath(`/app/${slug}`)
  }
  return (
    <form action={newBookmark}>
      <Input
        name="content"
        placeholder="Insert a link, color, or just plain text.."
        type="text"
        autoComplete="off"
      />
      {/* <HighlightInput
        autoComplete="off"
        placeholder="Insert a link, color, or just plain text.."
        type="text"
        name="url"
      /> */}
    </form>
  )
}
