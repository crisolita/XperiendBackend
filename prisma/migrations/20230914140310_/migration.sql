/*
  Warnings:

  - The primary key for the `KycImages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "KycImages" DROP CONSTRAINT "KycImages_pkey",
ADD CONSTRAINT "KycImages_pkey" PRIMARY KEY ("path");
