-- CreateEnum
CREATE TYPE "RolDoc" AS ENUM ('DOSSIER', 'DETALLES', 'TESTIGOS', 'UBICACION', 'PLANOS', 'ECONOMICO', 'DESCARGABLE');

-- CreateTable
CREATE TABLE "ProjectDocs" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "rol" "RolDoc" NOT NULL,
    "visible" BOOLEAN NOT NULL,

    CONSTRAINT "ProjectDocs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDocs_path_key" ON "ProjectDocs"("path");

-- AddForeignKey
ALTER TABLE "ProjectDocs" ADD CONSTRAINT "ProjectDocs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
