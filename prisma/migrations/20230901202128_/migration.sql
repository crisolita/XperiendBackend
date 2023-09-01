-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('NUEVO', 'PROXIMAMENTE', 'PUBLICO', 'ABIERTO', 'EN_PROCESO', 'CERRADO', 'REINVERSION', 'TERMINADO');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('COMPRA', 'VENTA', 'RECOMPRA', 'RECLARMAR', 'REINVERSION');

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "authToken" TEXT,
    "referallFriend" TEXT,
    "googleID" TEXT,
    "userName" TEXT,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "authToken" TEXT,
    "referallFriend" TEXT,
    "googleID" TEXT,
    "userName" TEXT,
    "newsletter" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuentas" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "banco" TEXT NOT NULL,

    CONSTRAINT "Cuentas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "creator_id" INTEGER,
    "estado" "Estado",
    "description" TEXT,
    "ubicacion" TEXT,
    "plazo_meses" INTEGER,
    "fecha_proximamente" TIMESTAMP(3),
    "fecha_publico" TIMESTAMP(3),
    "fecha_abierto" TIMESTAMP(3),
    "fecha_cerrado" TIMESTAMP(3),
    "fecha_en_proceso" TIMESTAMP(3),
    "fecha_reinversion" TIMESTAMP(3),
    "fecha_terminado" TIMESTAMP(3),
    "costo_ejecucion_conservador" DOUBLE PRECISION,
    "beneficio_conservador" DOUBLE PRECISION,
    "rentabilidad_conservador" DOUBLE PRECISION,
    "costo_ejecucion_moderado" DOUBLE PRECISION,
    "beneficio_moderado" DOUBLE PRECISION,
    "rentabilidad_moderado" DOUBLE PRECISION,
    "costo_ejecucion_favorable" DOUBLE PRECISION,
    "beneficio_favorable" DOUBLE PRECISION,
    "rentabilidad_favorable" DOUBLE PRECISION,
    "concepto_bancario" TEXT,
    "cuenta_id" INTEGER NOT NULL,
    "count_image" INTEGER,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectImages" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "ProjectImages_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_ProjectsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_googleID_key" ON "Admins"("googleID");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_userName_key" ON "Admins"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleID_key" ON "User"("googleID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_creator_id_key" ON "Projects"("creator_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsToUser_AB_unique" ON "_ProjectsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsToUser_B_index" ON "_ProjectsToUser"("B");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_cuenta_id_fkey" FOREIGN KEY ("cuenta_id") REFERENCES "Cuentas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectImages" ADD CONSTRAINT "ProjectImages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUser" ADD CONSTRAINT "_ProjectsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUser" ADD CONSTRAINT "_ProjectsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
