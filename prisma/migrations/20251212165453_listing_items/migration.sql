/*
  Warnings:

  - You are about to drop the column `originalPricePerTicket` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `row` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `seatNumbers` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "originalPricePerTicket",
DROP COLUMN "row",
DROP COLUMN "seatNumbers";

-- CreateTable
CREATE TABLE "ListingItem" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "row" TEXT,
    "seatNumber" TEXT,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "ListingItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ListingItem_listingId_idx" ON "ListingItem"("listingId");

-- AddForeignKey
ALTER TABLE "ListingItem" ADD CONSTRAINT "ListingItem_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
