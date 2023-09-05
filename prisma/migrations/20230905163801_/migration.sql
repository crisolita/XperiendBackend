/*
  Warnings:

  - The values [ESTIMADO] on the enum `Escenario` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `plazo_meses` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Escenario_new" AS ENUM ('CONSERVADOR', 'MODERADO', 'FAVORABLE');
ALTER TABLE "Escenario_economico" ALTER COLUMN "escenario" TYPE "Escenario_new" USING ("escenario"::text::"Escenario_new");
ALTER TYPE "Escenario" RENAME TO "Escenario_old";
ALTER TYPE "Escenario_new" RENAME TO "Escenario";
DROP TYPE "Escenario_old";
COMMIT;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "plazo_meses",
ADD COLUMN     "beneficio_etimado" DOUBLE PRECISION,
ADD COLUMN     "ejecucion_proyecto" DOUBLE PRECISION,
ADD COLUMN     "plazo_ejecucion" INTEGER,
ADD COLUMN     "rentabilidad_estimada" DOUBLE PRECISION;
