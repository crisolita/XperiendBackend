/*
  Warnings:

  - Made the column `cantidadRestante` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "cantidadRestante" SET NOT NULL;
