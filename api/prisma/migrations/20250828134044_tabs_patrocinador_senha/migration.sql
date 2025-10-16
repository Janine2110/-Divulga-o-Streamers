/*
  Warnings:

  - You are about to alter the column `senha` on the `patrocinadores` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "public"."patrocinadores" ALTER COLUMN "senha" SET DATA TYPE VARCHAR(60);
