/*
  Warnings:

  - A unique constraint covering the columns `[project_id]` on the table `ProjectImages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectImages_project_id_key" ON "ProjectImages"("project_id");
