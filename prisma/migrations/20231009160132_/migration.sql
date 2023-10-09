/*
  Warnings:

  - Made the column `userRol` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "EstadoPagoYFirma" ADD VALUE 'POR_INTERCAMBIAR';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userRol" SET NOT NULL;
