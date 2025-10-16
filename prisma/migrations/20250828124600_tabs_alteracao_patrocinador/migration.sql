/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `patrocinadores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cidade` to the `patrocinadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `patrocinadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `patrocinadores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."patrocinadores" DROP CONSTRAINT "patrocinadores_streamerId_fkey";

-- AlterTable
ALTER TABLE "public"."patrocinadores" ADD COLUMN     "cidade" VARCHAR(30) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "senha" VARCHAR(255) NOT NULL,
ALTER COLUMN "streamerId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patrocinadores_email_key" ON "public"."patrocinadores"("email");

-- AddForeignKey
ALTER TABLE "public"."patrocinadores" ADD CONSTRAINT "patrocinadores_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "public"."streamers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
