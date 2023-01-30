/*
  Warnings:

  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance",
DROP COLUMN "wallet",
ADD COLUMN     "mngpayId" TEXT;
