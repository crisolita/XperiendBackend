/*
  Warnings:

  - You are about to drop the column `amountUSD` on the `OrdersXREN` table. All the data in the column will be lost.
  - Added the required column `amountEUR` to the `OrdersXREN` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdersXREN" DROP COLUMN "amountUSD",
ADD COLUMN     "amountEUR" DOUBLE PRECISION NOT NULL;
