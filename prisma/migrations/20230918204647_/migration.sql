/*
  Warnings:

  - You are about to drop the column `amount` on the `OrdersXREN` table. All the data in the column will be lost.
  - You are about to drop the column `monto` on the `Pagos` table. All the data in the column will be lost.
  - Added the required column `amountUSD` to the `OrdersXREN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidades` to the `OrdersXREN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montoUSD` to the `Pagos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KycInfo" ALTER COLUMN "telefono" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrdersXREN" DROP COLUMN "amount",
ADD COLUMN     "amountUSD" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unidades" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pagos" DROP COLUMN "monto",
ADD COLUMN     "montoUSD" DOUBLE PRECISION NOT NULL;
