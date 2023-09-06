-- CreateEnum
CREATE TYPE "METODODEPAGO" AS ENUM ('TRANSFERENCIA_BANCARIA', 'USDT', 'BUSD', 'TARJETA_DE_CREDITO');

-- CreateTable
CREATE TABLE "Pagos" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "metodo_de_pago" "METODODEPAGO" NOT NULL,
    "concepto" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pagos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pagos" ADD CONSTRAINT "Pagos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
