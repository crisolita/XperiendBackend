/*
  Warnings:

  - Added the required column `project_id` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "project_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
