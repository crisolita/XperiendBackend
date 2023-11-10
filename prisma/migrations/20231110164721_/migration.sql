/*
  Warnings:

  - Added the required column `estado_civil` to the `KycInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Estado_civil" AS ENUM ('SOLTERO', 'CASADO', 'DIVORCIADO', 'SEPARADO', 'VIUDO');

-- AlterTable
ALTER TABLE "KycInfo" ADD COLUMN     "estado_civil" "Estado_civil" NOT NULL;
