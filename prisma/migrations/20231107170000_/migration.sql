/*
  Warnings:

  - Added the required column `titular` to the `Cuentas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuentas" ADD COLUMN     "titular" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GestionXREN" ADD COLUMN     "titular" TEXT;
