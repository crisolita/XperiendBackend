/*
  Warnings:

  - You are about to drop the column `DNI` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `apellido` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `estado_civil` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_nacimiento` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `profesion` on the `KycInfo` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `KycInfo` table. All the data in the column will be lost.
  - Added the required column `address` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_born` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `KycInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telf` to the `KycInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KycInfo" DROP COLUMN "DNI",
DROP COLUMN "apellido",
DROP COLUMN "estado_civil",
DROP COLUMN "fecha_nacimiento",
DROP COLUMN "nombre",
DROP COLUMN "pais",
DROP COLUMN "profesion",
DROP COLUMN "telefono",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "country_born" TEXT NOT NULL,
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "postalCode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "telf" TEXT NOT NULL;
