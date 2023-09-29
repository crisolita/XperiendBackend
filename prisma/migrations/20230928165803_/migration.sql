/*
  Warnings:

  - The values [VENTA,RECLARMAR] on the enum `Tipo` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `document_type` on the `Templates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Tipo_new" AS ENUM ('COMPRA', 'INTERCAMBIO', 'RECOMPRA', 'RECLAMACION', 'REINVERSION');
ALTER TABLE "Templates" ALTER COLUMN "document_type" TYPE "Tipo_new" USING ("document_type"::text::"Tipo_new");
ALTER TABLE "Orders" ALTER COLUMN "tipo" TYPE "Tipo_new" USING ("tipo"::text::"Tipo_new");
ALTER TABLE "OrdersXREN" ALTER COLUMN "tipo" TYPE "Tipo_new" USING ("tipo"::text::"Tipo_new");
ALTER TYPE "Tipo" RENAME TO "Tipo_old";
ALTER TYPE "Tipo_new" RENAME TO "Tipo";
DROP TYPE "Tipo_old";
COMMIT;

-- AlterTable
ALTER TABLE "Templates" DROP COLUMN "document_type",
ADD COLUMN     "document_type" "Tipo" NOT NULL;

-- DropEnum
DROP TYPE "DocumentType";
