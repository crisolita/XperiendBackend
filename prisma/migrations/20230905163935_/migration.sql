/*
  Warnings:

  - You are about to drop the column `beneficio_etimado` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "beneficio_etimado",
ADD COLUMN     "beneficio_estimado" DOUBLE PRECISION;
