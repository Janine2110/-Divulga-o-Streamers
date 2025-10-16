-- CreateEnum
CREATE TYPE "public"."Plataforms" AS ENUM ('YOUTUBE', 'TWITCH', 'FACEBOOK', 'INSTAGRAM', 'TIKTOK', 'KICK');

-- CreateTable
CREATE TABLE "public"."streamers" (
    "id" SERIAL NOT NULL,
    "idade" SMALLINT NOT NULL,
    "seguidores" SMALLINT NOT NULL,
    "foto" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT true,
    "plataforms" "public"."Plataforms" NOT NULL DEFAULT 'YOUTUBE',
    "nome" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "streamers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."patrocinadores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "idade" SMALLINT NOT NULL,
    "streamerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patrocinadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."propostas" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(30) NOT NULL,
    "descricao" TEXT NOT NULL,
    "streamerId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "patrocinadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propostas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- AddForeignKey
ALTER TABLE "public"."streamers" ADD CONSTRAINT "streamers_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."patrocinadores" ADD CONSTRAINT "patrocinadores_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "public"."streamers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "public"."streamers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_patrocinadorId_fkey" FOREIGN KEY ("patrocinadorId") REFERENCES "public"."patrocinadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
