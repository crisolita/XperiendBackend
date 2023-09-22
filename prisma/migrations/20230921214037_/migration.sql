/*
  Warnings:

  - The values [ABIERTO] on the enum `Estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Estado_new" AS ENUM ('NUEVO', 'PROXIMAMENTE', 'PUBLICO', 'EN_PROCESO', 'NO_COMPLETADO', 'CERRADO', 'TERMINADO');
ALTER TABLE "Projects" ALTER COLUMN "estado" TYPE "Estado_new" USING ("estado"::text::"Estado_new");
ALTER TYPE "Estado" RENAME TO "Estado_old";
ALTER TYPE "Estado_new" RENAME TO "Estado";
DROP TYPE "Estado_old";
COMMIT;
