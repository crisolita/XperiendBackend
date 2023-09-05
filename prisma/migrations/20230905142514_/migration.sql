/*
  Warnings:

  - You are about to drop the column `beneficio_conservador` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `beneficio_favorable` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `beneficio_moderado` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `costo_ejecucion_conservador` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `costo_ejecucion_favorable` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `costo_ejecucion_moderado` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_abierto` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_cerrado` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_en_proceso` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_proximamente` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_publico` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_reinversion` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_terminado` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `rentabilidad_conservador` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `rentabilidad_favorable` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `rentabilidad_moderado` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `titulo` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RolImage" AS ENUM ('PRINCIPAL', 'NFT', 'GALERIA');

-- CreateEnum
CREATE TYPE "Escenario" AS ENUM ('CONSERVADOR', 'MODERADO', 'FAVORABLE');

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_cuenta_id_fkey";

-- AlterTable
ALTER TABLE "ProjectImages" ADD COLUMN     "rol" "RolImage";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "beneficio_conservador",
DROP COLUMN "beneficio_favorable",
DROP COLUMN "beneficio_moderado",
DROP COLUMN "costo_ejecucion_conservador",
DROP COLUMN "costo_ejecucion_favorable",
DROP COLUMN "costo_ejecucion_moderado",
DROP COLUMN "fecha_abierto",
DROP COLUMN "fecha_cerrado",
DROP COLUMN "fecha_en_proceso",
DROP COLUMN "fecha_proximamente",
DROP COLUMN "fecha_publico",
DROP COLUMN "fecha_reinversion",
DROP COLUMN "fecha_terminado",
DROP COLUMN "nombre",
DROP COLUMN "rentabilidad_conservador",
DROP COLUMN "rentabilidad_favorable",
DROP COLUMN "rentabilidad_moderado",
ADD COLUMN     "beneficio_estimado" DOUBLE PRECISION,
ADD COLUMN     "costo_ejecucion_estimado" DOUBLE PRECISION,
ADD COLUMN     "definicion" TEXT,
ADD COLUMN     "recuperar_dinero_info" TEXT,
ADD COLUMN     "rentabilidad_estimada" DOUBLE PRECISION,
ADD COLUMN     "resumen" TEXT,
ADD COLUMN     "titulo" TEXT NOT NULL,
ALTER COLUMN "precioUnitario" DROP NOT NULL,
ALTER COLUMN "cuenta_id" DROP NOT NULL,
ALTER COLUMN "cantidadInicial" DROP NOT NULL,
ALTER COLUMN "cantidadRestante" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Escenario_economico" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "escenario" "Escenario",
    "aporte_inversores" DOUBLE PRECISION,
    "beneficio" DOUBLE PRECISION,
    "rentabilidad" DOUBLE PRECISION,
    "coste_activo" DOUBLE PRECISION,
    "costo_construccion" DOUBLE PRECISION,
    "gestion_xperiend" DOUBLE PRECISION,
    "coste_desarrollo" DOUBLE PRECISION,
    "coste_promocion" DOUBLE PRECISION,
    "recursion" DOUBLE PRECISION,

    CONSTRAINT "Escenario_economico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gestion_fechas" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "fecha_proximamente" TIMESTAMP(3),
    "fecha_publico" TIMESTAMP(3),
    "fecha_abierto" TIMESTAMP(3),
    "fecha_cerrado" TIMESTAMP(3),
    "fecha_en_proceso" TIMESTAMP(3),
    "fecha_reinversion" TIMESTAMP(3),
    "fecha_terminado" TIMESTAMP(3),

    CONSTRAINT "Gestion_fechas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gestion_fechas_project_id_key" ON "Gestion_fechas"("project_id");

-- AddForeignKey
ALTER TABLE "Escenario_economico" ADD CONSTRAINT "Escenario_economico_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gestion_fechas" ADD CONSTRAINT "Gestion_fechas_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_cuenta_id_fkey" FOREIGN KEY ("cuenta_id") REFERENCES "Cuentas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
