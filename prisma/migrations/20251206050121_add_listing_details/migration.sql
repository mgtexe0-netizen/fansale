-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isPurchasable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "offerLabel" TEXT,
ADD COLUMN     "originalPricePerTicket" DOUBLE PRECISION,
ADD COLUMN     "seatType" TEXT,
ADD COLUMN     "serviceFeePerTicket" DOUBLE PRECISION;
