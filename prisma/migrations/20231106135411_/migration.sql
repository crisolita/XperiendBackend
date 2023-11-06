/*
  Warnings:

  - You are about to drop the column `motivo_rechazo` on the `KycInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KycInfo" DROP COLUMN "motivo_rechazo";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "motivo_de_rechazo_kyc" TEXT;
