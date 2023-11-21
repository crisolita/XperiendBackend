/*
  Warnings:

  - The primary key for the `Templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Templates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `template_id` to the `Templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Templates" DROP CONSTRAINT "Templates_pkey",
ADD COLUMN     "template_id" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Templates_pkey" PRIMARY KEY ("id");
