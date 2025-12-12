/*
  Warnings:

  - You are about to drop the column `description` on the `ListingItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListingItem" DROP COLUMN "description",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
