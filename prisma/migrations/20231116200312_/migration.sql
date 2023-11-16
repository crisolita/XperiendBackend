/*
  Warnings:

  - Added the required column `cuenta_bancaria` to the `KycInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KycInfo" ADD COLUMN     "cuenta_bancaria" TEXT NOT NULL;
