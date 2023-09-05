/*
  Warnings:

  - You are about to drop the column `precioUnitario` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "precioUnitario",
ADD COLUMN     "precio_unitario" DOUBLE PRECISION;
