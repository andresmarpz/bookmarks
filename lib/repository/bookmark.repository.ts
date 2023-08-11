import type { Bookmark, User } from "@prisma/client"

import { prisma } from "@/lib/prisma"

type CreateBookmarkInput = Pick<
  Bookmark,
  "title" | "url" | "description" | "image" | "groupId"
> &
  Pick<User, "uid">

class BookmarkRepository {
  public async createOne(input: CreateBookmarkInput): Promise<Bookmark> {
    return await prisma.bookmark.create({
      data: {
        title: input.title,
        url: input.url,
        description: input.description,
        image: input.image,
        group: {
          connect: {
            id: input.groupId,
          },
        },
        user: {
          connect: {
            uid: input.uid,
          },
        },
      },
    })
  }

  public async delete(input: Pick<Bookmark, "id">): Promise<Bookmark> {
    return await prisma.bookmark.delete({
      where: input,
    })
  }

  public async updateOne(input: Partial<Bookmark>): Promise<Bookmark> {
    console.log(input)
    return await prisma.bookmark.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        url: input.url,
        description: input.description,
        image: input.image,

        group: {
          connect: {
            slug: input.groupSlug,
          },
        },
      },
    })
  }

  public async findMany(input: Pick<Bookmark, "groupId">): Promise<Bookmark[]> {
    return await prisma.bookmark.findMany({
      where: input,
      orderBy: {
        createdAt: "desc",
      },
    })
  }
}

export const bookmarkRepository = new BookmarkRepository()