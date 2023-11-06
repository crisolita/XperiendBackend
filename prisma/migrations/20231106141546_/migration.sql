/*
  Warnings:

  - You are about to drop the column `motivo_de_rechazo_kyc` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "motivo_de_rechazo_kyc",
ADD COLUMN     "motivo_rechazo_kyc" TEXT;
