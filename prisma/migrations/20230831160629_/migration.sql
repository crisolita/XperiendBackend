/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVO', 'CERRADO', 'ESTUDIO');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "authToken" TEXT,
    "referallFriend" TEXT,
    "googleID" TEXT,
    "userName" TEXT,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "creator_id" INTEGER,
    "estado" "Estado",
    "description" TEXT,
    "ubicacion" TEXT,
    "plazo_meses" INTEGER,
    "costo_ejecucion_conservador" DOUBLE PRECISION,
    "beneficio_conservador" DOUBLE PRECISION,
    "rentabilidad_conservador" DOUBLE PRECISION,
    "costo_ejecucion_moderado" DOUBLE PRECISION,
    "beneficio_moderado" DOUBLE PRECISION,
    "rentabilidad_moderado" DOUBLE PRECISION,
    "costo_ejecucion_favorable" DOUBLE PRECISION,
    "beneficio_favorable" DOUBLE PRECISION,
    "rentabilidad_favorable" DOUBLE PRECISION,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_googleID_key" ON "Admins"("googleID");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_userName_key" ON "Admins"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_creator_id_key" ON "Projects"("creator_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsToUser_AB_unique" ON "_ProjectsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsToUser_B_index" ON "_ProjectsToUser"("B");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUser" ADD CONSTRAINT "_ProjectsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUser" ADD CONSTRAINT "_ProjectsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
