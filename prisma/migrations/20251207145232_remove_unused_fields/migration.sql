/*
  Warnings:

  - You are about to drop the column `currency` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerTicket` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `restrictions` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `seatType` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `sellerEmail` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `sellerName` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `sellerPhone` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "currency",
DROP COLUMN "pricePerTicket",
DROP COLUMN "quantity",
DROP COLUMN "restrictions",
DROP COLUMN "seatType",
DROP COLUMN "sellerEmail",
DROP COLUMN "sellerName",
DROP COLUMN "sellerPhone",
DROP COLUMN "totalPrice";
