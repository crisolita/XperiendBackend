/*
  Warnings:

  - The values [ACTIVO,ESTUDIO] on the enum `Estado` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `cuenta_id` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('COMPRA', 'VENTA', 'RECOMPRA', 'RECLARMAR', 'REINVERSION');

-- AlterEnum
BEGIN;
CREATE TYPE "Estado_new" AS ENUM ('NUEVO', 'PROXIMAMENTE', 'PUBLICO', 'ABIERTO', 'EN_PROCESO', 'CERRADO', 'REINVERSION', 'TERMINADO');
ALTER TABLE "Projects" ALTER COLUMN "estado" TYPE "Estado_new" USING ("estado"::text::"Estado_new");
ALTER TYPE "Estado" RENAME TO "Estado_old";
ALTER TYPE "Estado_new" RENAME TO "Estado";
DROP TYPE "Estado_old";
COMMIT;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "name",
ADD COLUMN     "concepto_bancario" TEXT,
ADD COLUMN     "cuenta_id" INTEGER NOT NULL,
ADD COLUMN     "fecha_abierto" TIMESTAMP(3),
ADD COLUMN     "fecha_cerrado" TIMESTAMP(3),
ADD COLUMN     "fecha_en_proceso" TIMESTAMP(3),
ADD COLUMN     "fecha_proximamente" TIMESTAMP(3),
ADD COLUMN     "fecha_publico" TIMESTAMP(3),
ADD COLUMN     "fecha_reinversion" TIMESTAMP(3),
ADD COLUMN     "fecha_terminado" TIMESTAMP(3),
ADD COLUMN     "nombre" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Cuentas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "banco" TEXT NOT NULL,

    CONSTRAINT "Cuentas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nft_id" INTEGER,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" INTEGER NOT NULL,
    "txHash" TEXT NOT NULL,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_cuenta_id_fkey" FOREIGN KEY ("cuenta_id") REFERENCES "Cuentas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
