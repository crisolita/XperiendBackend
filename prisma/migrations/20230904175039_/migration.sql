/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `cantidadInicial` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "cantidad",
ADD COLUMN     "cantidadInicial" INTEGER NOT NULL;
