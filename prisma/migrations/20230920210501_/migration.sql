/*
  Warnings:

  - The primary key for the `Admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authToken` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `googleID` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `referallFriend` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Admins` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admins_email_key";

-- DropIndex
DROP INDEX "Admins_googleID_key";

-- DropIndex
DROP INDEX "Admins_userName_key";

-- AlterTable
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_pkey",
DROP COLUMN "authToken",
DROP COLUMN "email",
DROP COLUMN "googleID",
DROP COLUMN "id",
DROP COLUMN "password",
DROP COLUMN "referallFriend",
DROP COLUMN "userName",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "Admins_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
