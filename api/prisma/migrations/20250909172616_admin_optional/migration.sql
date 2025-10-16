-- DropForeignKey
ALTER TABLE "public"."propostas" DROP CONSTRAINT "propostas_adminId_fkey";

-- AlterTable
ALTER TABLE "public"."propostas" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
