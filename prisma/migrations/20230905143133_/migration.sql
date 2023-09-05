/*
  Warnings:

  - You are about to drop the column `beneficio_estimado` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `costo_ejecucion_estimado` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `rentabilidad_estimada` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Escenario" ADD VALUE 'ESTIMADO';

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "beneficio_estimado",
DROP COLUMN "costo_ejecucion_estimado",
DROP COLUMN "rentabilidad_estimada";

-- CreateTable
CREATE TABLE "InfoProject" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "InfoProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfoProject_project_id_key" ON "InfoProject"("project_id");

-- AddForeignKey
ALTER TABLE "InfoProject" ADD CONSTRAINT "InfoProject_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
