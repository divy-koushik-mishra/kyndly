/*
  Warnings:

  - Added the required column `name` to the `apps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apps" ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
