-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('COMPRA', 'INTERCAMBIO', 'RECOMPRA', 'REINVERSION', 'RECLAMACION');

-- CreateTable
CREATE TABLE "Templates" (
    "id" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "document_type" "DocumentType" NOT NULL,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
