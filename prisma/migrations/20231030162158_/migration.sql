/*
  Warnings:

  - You are about to drop the column `xrenAccount` on the `Cuentas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cuentas" DROP COLUMN "xrenAccount";

-- CreateTable
CREATE TABLE "GestionXREN" (
    "id" SERIAL NOT NULL,
    "numero" TEXT,
    "banco" TEXT,
    "pagoTransferencia" BOOLEAN,
    "pagoTarjeta" BOOLEAN,
    "pagoCripto" BOOLEAN,

    CONSTRAINT "GestionXREN_pkey" PRIMARY KEY ("id")
);
