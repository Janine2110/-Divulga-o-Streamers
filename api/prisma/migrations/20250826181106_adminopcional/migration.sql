-- DropForeignKey
ALTER TABLE "public"."streamers" DROP CONSTRAINT "streamers_adminId_fkey";

-- AlterTable
ALTER TABLE "public"."streamers" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."streamers" ADD CONSTRAINT "streamers_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
