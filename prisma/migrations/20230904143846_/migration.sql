/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `ProjectImages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectImages_project_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectImages_path_key" ON "ProjectImages"("path");
