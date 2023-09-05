/*
  Warnings:

  - The values [REINVERSION] on the enum `Estado` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoPago" AS ENUM ('PAGADO_Y_ENTREGADO', 'PAGO_PENDIENTE', 'ERROR_EN_PAGO', 'POR_ENTREGAR');

-- AlterEnum
BEGIN;
CREATE TYPE "Estado_new" AS ENUM ('NUEVO', 'PROXIMAMENTE', 'PUBLICO', 'ABIERTO', 'EN_PROCESO', 'CERRADO', 'TERMINADO');
ALTER TABLE "Projects" ALTER COLUMN "estado" TYPE "Estado_new" USING ("estado"::text::"Estado_new");
ALTER TYPE "Estado" RENAME TO "Estado_old";
ALTER TYPE "Estado_new" RENAME TO "Estado";
DROP TYPE "Estado_old";
COMMIT;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "status" "EstadoPago" NOT NULL;
