-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_groupId_groupSlug_fkey";

-- DropIndex
DROP INDEX "Bookmark_id_key";

-- CreateTable
CREATE TABLE "_BookmarkToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookmarkToGroup_AB_unique" ON "_BookmarkToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_BookmarkToGroup_B_index" ON "_BookmarkToGroup"("B");

-- AddForeignKey
ALTER TABLE "_BookmarkToGroup" ADD CONSTRAINT "_BookmarkToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToGroup" ADD CONSTRAINT "_BookmarkToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
