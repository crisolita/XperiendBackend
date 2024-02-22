/*
  Warnings:

  - The `nft_id` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_nft_id_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "nft_id",
ADD COLUMN     "nft_id" INTEGER[];
