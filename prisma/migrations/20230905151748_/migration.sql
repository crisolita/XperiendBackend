/*
  Warnings:

  - You are about to drop the `InfoProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InfoProject" DROP CONSTRAINT "InfoProject_project_id_fkey";

-- DropTable
DROP TABLE "InfoProject";
