/*
  Warnings:

  - Made the column `openingDate` on table `UserManage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minXRENwallet` on table `UserManage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minXRENstake` on table `UserManage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserManage" ALTER COLUMN "openingDate" SET NOT NULL,
ALTER COLUMN "minXRENwallet" SET NOT NULL,
ALTER COLUMN "minXRENstake" SET NOT NULL;
