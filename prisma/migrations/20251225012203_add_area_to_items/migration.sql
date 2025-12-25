/*
  Warnings:

  - You are about to drop the column `area` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "area";

-- AlterTable
ALTER TABLE "ListingItem" ADD COLUMN     "area" TEXT;
