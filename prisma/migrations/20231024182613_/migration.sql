/*
  Warnings:

  - You are about to drop the `_ProjectsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectsToUser" DROP CONSTRAINT "_ProjectsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectsToUser" DROP CONSTRAINT "_ProjectsToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoritos" INTEGER[];

-- DropTable
DROP TABLE "_ProjectsToUser";
