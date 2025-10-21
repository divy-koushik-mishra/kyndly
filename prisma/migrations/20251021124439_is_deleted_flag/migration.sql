-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;
