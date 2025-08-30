-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_authorId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
