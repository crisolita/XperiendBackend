/*
  Warnings:

  - The values [PAGO_EXITOSO] on the enum `StatusOrderXREN` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusOrderXREN_new" AS ENUM ('PAGO_PENDIENTE', 'ERROR_EN_PAGO', 'POR_ENTREGAR', 'PAGO_EXITOSO_ENTREGADO');
ALTER TABLE "OrdersXREN" ALTER COLUMN "status" TYPE "StatusOrderXREN_new" USING ("status"::text::"StatusOrderXREN_new");
ALTER TYPE "StatusOrderXREN" RENAME TO "StatusOrderXREN_old";
ALTER TYPE "StatusOrderXREN_new" RENAME TO "StatusOrderXREN";
DROP TYPE "StatusOrderXREN_old";
COMMIT;

-- AlterTable
ALTER TABLE "OrdersXREN" ADD COLUMN     "hash" TEXT;
