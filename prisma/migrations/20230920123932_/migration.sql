/*
  Warnings:

  - Made the column `document_number` on table `KycInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "KycInfo" ALTER COLUMN "document_number" SET NOT NULL;
