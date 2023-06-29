/*
  Warnings:

  - You are about to drop the column `referall` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_referall_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referall",
ADD COLUMN     "userName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
