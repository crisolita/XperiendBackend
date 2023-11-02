/*
  Warnings:

  - Added the required column `user_rol_visible` to the `ProjectDocs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectDocs" ADD COLUMN     "user_rol_visible" "UserRolVisibilidad" NOT NULL;
