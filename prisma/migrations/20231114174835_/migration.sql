/*
  Warnings:

  - You are about to drop the column `montoUSD` on the `Pagos` table. All the data in the column will be lost.
  - Added the required column `montoEUR` to the `Pagos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagos" DROP COLUMN "montoUSD",
ADD COLUMN     "montoEUR" DOUBLE PRECISION NOT NULL;
