/*
  Warnings:

  - You are about to drop the column `fecha_abierto` on the `Gestion_fechas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_cerrado` on the `Gestion_fechas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_en_proceso` on the `Gestion_fechas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_proximamente` on the `Gestion_fechas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_publico` on the `Gestion_fechas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_reinversion` on the `Gestion_fechas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_terminado` on the `Gestion_fechas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gestion_fechas" DROP COLUMN "fecha_abierto",
DROP COLUMN "fecha_cerrado",
DROP COLUMN "fecha_en_proceso",
DROP COLUMN "fecha_proximamente",
DROP COLUMN "fecha_publico",
DROP COLUMN "fecha_reinversion",
DROP COLUMN "fecha_terminado",
ADD COLUMN     "fecha_fin_intercambio" TIMESTAMP(3),
ADD COLUMN     "fecha_fin_reinversion" TIMESTAMP(3),
ADD COLUMN     "fecha_fin_venta" TIMESTAMP(3),
ADD COLUMN     "fecha_inicio_intercambio" TIMESTAMP(3),
ADD COLUMN     "fecha_inicio_reinversion" TIMESTAMP(3),
ADD COLUMN     "fecha_reclamo" TIMESTAMP(3);
