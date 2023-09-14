/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusKYC" AS ENUM ('APROBADO', 'RECHAZADO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RolImage" ADD VALUE 'DNIFRONTAL';
ALTER TYPE "RolImage" ADD VALUE 'DNITRASERA';
ALTER TYPE "RolImage" ADD VALUE 'USERDNI';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName";

-- CreateTable
CREATE TABLE "KycInfo" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "status" "StatusKYC" NOT NULL,
    "motivo_rechazo" TEXT,
    "wallet" TEXT NOT NULL,

    CONSTRAINT "KycInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KycImages" (
    "info_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "rol" "RolImage" NOT NULL,

    CONSTRAINT "KycImages_pkey" PRIMARY KEY ("info_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KycInfo_user_id_key" ON "KycInfo"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "KycImages_path_key" ON "KycImages"("path");

-- AddForeignKey
ALTER TABLE "KycInfo" ADD CONSTRAINT "KycInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycImages" ADD CONSTRAINT "KycImages_info_id_fkey" FOREIGN KEY ("info_id") REFERENCES "KycInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
