/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedOn` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "createdOn" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lockCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedById" INTEGER NOT NULL,
ADD COLUMN     "updatedOn" TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name";

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
