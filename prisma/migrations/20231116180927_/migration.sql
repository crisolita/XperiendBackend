/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `KycInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KycInfo_wallet_key" ON "KycInfo"("wallet");
