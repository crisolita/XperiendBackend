/*
  Warnings:

  - You are about to drop the column `Provincia` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `localidad` on the `KycInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KycInfo" DROP COLUMN "Provincia",
DROP COLUMN "localidad";
