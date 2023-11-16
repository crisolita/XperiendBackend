/*
  Warnings:

  - You are about to drop the column `fecha_reclamo` on the `Gestion_fechas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gestion_fechas" DROP COLUMN "fecha_reclamo",
ADD COLUMN     "fecha_fin_reclamo" TIMESTAMP(3),
ADD COLUMN     "fecha_inicio_reclamo" TIMESTAMP(3),
ADD COLUMN     "visible_intercambio" BOOLEAN,
ADD COLUMN     "visible_reclamo" BOOLEAN,
ADD COLUMN     "visible_reinversion" BOOLEAN;
