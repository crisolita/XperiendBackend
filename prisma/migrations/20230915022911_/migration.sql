-- CreateEnum
CREATE TYPE "StatusOrderXREN" AS ENUM ('PAGO_PENDIENTE', 'ERROR_EN_PAGO', 'POR_ENTREGAR', 'PAGO_EXITOSO');

-- CreateTable
CREATE TABLE "OrdersXREN" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "StatusOrderXREN" NOT NULL,
    "amount" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3),

    CONSTRAINT "OrdersXREN_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrdersXREN" ADD CONSTRAINT "OrdersXREN_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
