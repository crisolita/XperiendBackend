/*
  Warnings:

  - The `regimen_matrimonial` column on the `KycInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `Provincia` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidad` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel_inversion` to the `KycInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Regimen_matrimonial" AS ENUM ('GANANCIAS', 'SEPARACION_DE_BIENES');

-- CreateEnum
CREATE TYPE "NIVEL_DE_INVERSION" AS ENUM ('A_0_10000', 'B_10_50000', 'C_50000_100000', 'D_100000');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RolImage" ADD VALUE 'RESIDENCIA_FISCAL';
ALTER TYPE "RolImage" ADD VALUE 'TITULAR_CUENTA';

-- AlterTable
ALTER TABLE "KycInfo" ADD COLUMN     "Provincia" TEXT NOT NULL,
ADD COLUMN     "localidad" TEXT NOT NULL,
ADD COLUMN     "nivel_inversion" "NIVEL_DE_INVERSION" NOT NULL,
ALTER COLUMN "postalCode" SET DATA TYPE TEXT,
DROP COLUMN "regimen_matrimonial",
ADD COLUMN     "regimen_matrimonial" "Regimen_matrimonial";
