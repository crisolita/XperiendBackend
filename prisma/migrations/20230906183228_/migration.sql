/*
  Warnings:

  - Changed the type of `status` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstadoPagoYFirma" AS ENUM ('PAGADO_Y_ENTREGADO_Y_FIRMADO', 'PAGO_PENDIENTE', 'ERROR_EN_PAGO', 'POR_FIRMAR', 'FIRMADO_POR_ENTREGAR');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "status",
ADD COLUMN     "status" "EstadoPagoYFirma" NOT NULL;

-- DropEnum
DROP TYPE "EstadoPago";
