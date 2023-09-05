-- CreateEnum
CREATE TYPE "TipoDeUser" AS ENUM ('REGULAR', 'PREMIUM', 'PREMIUMGOLD');

-- CreateTable
CREATE TABLE "UserManage" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "tipoDeUser" "TipoDeUser" NOT NULL,
    "openingDate" TIMESTAMP(3),
    "minXRENwallet" INTEGER,
    "minXRENstake" INTEGER,

    CONSTRAINT "UserManage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserManage" ADD CONSTRAINT "UserManage_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
