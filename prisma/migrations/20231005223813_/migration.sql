/*
  Warnings:

  - You are about to drop the `Admins` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "USERROL" AS ENUM ('CLIENT', 'ADMIN', 'SUPERADMIN');

-- DropForeignKey
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRol" "USERROL";

-- DropTable
DROP TABLE "Admins";
