/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import markicon from "../../../public/mark.png";
import shakeicon from "../../../public/shake.png";
import moreicon from "../../../public/moreicon.png";
type TicketListProps = {
  eventSlug: string;
  listings: any[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

export function TicketList({
  eventSlug,
  listings,
  openId,
  setOpenId,
}: TicketListProps) {
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(listings.map((l) => [l.id, 1]))
  );

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push(`/tickets/all/${eventSlug}/pay`);
  };

  const handleQuantityChange = (id: string, value: string) => {
    let num = parseInt(value, 10);
    if (Number.isNaN(num)) num = 1;
    if (num < 1) num = 1;
    if (num > 4) num = 4;
    setQuantities((prev) => ({ ...prev, [id]: num }));
  };

  const listingsWithPerTicket = listings
    .map((l) => {
      const original = l.originalPricePerTicket ?? 0;
      const fee = l.serviceFeePerTicket ?? 0;
      const perTicket = original + fee;

      return {
        ...l,
        original,
        fee,
        perTicket,
      };
    })
    .sort((a, b) => a.perTicket - b.perTicket);

  const formatMoney = (n: number) => `£ ${n.toFixed(2)}`;

  const formatSeatLine = (l: any) => {
    const parts: string[] = [];
    parts.push("Stalls");
    if (l.row) parts.push(`Row ${l.row}`);
    if (l.seatNumbers) parts.push(`Seat ${l.seatNumbers}`);
    parts.push("Stalls");
    return parts.join(" | ");
  };

  const formatTimeRemaining = (expiresAt?: string | Date | null) => {
    if (!expiresAt) return null;
    const expiry = new Date(expiresAt);
    const diffMs = expiry.getTime() - Date.now();
    if (diffMs <= 0) return "expired";

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;

    return `${days} days, ${hours}:00 hours`;
  };

  return (
    <div>
      {listingsWithPerTicket.map((listing: any) => {
        const qty = quantities[listing.id] ?? 1;
        const totalOriginal = qty * listing.original;
        const totalFee = qty * listing.fee;
        const totalFix = qty * listing.perTicket;
        const timeRemaining = formatTimeRemaining(listing.expiresAt);

        const isOpen = openId === listing.id;

        return (
          <div key={listing.id} className="border-[#e5e5e5] mt-1">
            <div
              className="flex gap-2 text-[13px] px-2 cursor-pointer"
              onClick={() => setOpenId(isOpen ? null : listing.id)}
            >
              <div className="border-r md:ml-2 border-[#e5e5e5] py-3 text-center">
                <div className="text-[11px] md:text-[14px] mr-3 font-medium text-[#555] mb-1">
                  Quantity
                </div>
                <input
                  type="number"
                  min={1}
                  max={4}
                  value={qty}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleQuantityChange(listing.id, e.target.value)
                  }
                  className="w-8 mx-auto border-0 rounded-sm text-center text-[15px] leading-[20px] focus:outline-none focus:ring-1 focus:ring-fns-primary"
                />
              </div>

              <div className="py-3 md:px-4 flex-1 min-w-0">
                <div className="text-[10px] md:text-[14px] text-[#333] ">
                  {formatSeatLine(listing)}
                </div>

                <div className="flex items-center justify-between md:gap-7">
                  <div className="flex justify-between  items-cente gap-28 md:gap-20">
                    {/* LEFT: price */}
                    <div className="text-[12px] md:text-[14px] font-normal md:font-medium text-fns-primary">
                      <span> Fixed price</span> {formatMoney(listing.perTicket)}
                    </div>

                    {/* RIGHT: push icons to the extreme end */}
                    <div className="ml-auto flex items-center gap-2 pr-1">
                      <div className="flex flex-col md:flex-row">
                        {" "}
                        <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white">
                          <img
                            className="w-5 md:w-10"
                            src={shakeicon.src}
                            alt=""
                          />
                        </span>
                        <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white">
                          <img
                            className="w-5 md:w-10"
                            src={markicon.src}
                            alt=""
                          />
                        </span>
                      </div>

                      <img
                        className="w-4     md:w-auto"
                        src={moreicon.src}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="flex  items-center justify-center hidden pr-3">
                    <img src={moreicon.src} alt="" />
                  </div>
                </div>
              </div>
            </div>

            {isOpen && (
              <div>
                <div className="flex   items-start gap-5 px-5 py-3 border-t">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="mt-1 accent-gray-300 flex-shrink-0 w-5 h-5 opacity-70"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm text-[#333] leading-relaxed break-words">
                      <span>{formatSeatLine(listing)}</span>
                      <span> | </span>
                      <span>{listing.ticketType || "Full Price Ticket"}</span>
                      {listing.original && (
                        <>
                          <span>
                            {" "}
                            | Original price: {formatMoney(listing.original)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-xs md:text-sm font-medium md:font-semibold text-[#003366] whitespace-nowrap flex-shrink-0">
                    {formatMoney(listing.original)}
                  </div>
                </div>
                <div className="px-5   pb-4 pt-3 bg-[#fafafa] text-[12px] text-[#333] border-t border-[#e5e5e5]">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="  text-[15px] md:text-[15px]">
                        Selected number of tickets:
                      </span>
                      <span className="text-[15px] text-fns-primary">
                        {qty}
                      </span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                      <span>Offer splitting:</span>
                      <span>Total</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                      <span>
                        {qty} ticket{qty > 1 ? "s" : ""} at{" "}
                        {formatMoney(listing.original)}:
                      </span>
                      <span className="text-fns-primary">
                        {formatMoney(totalOriginal)}
                      </span>
                    </div>
                    <div className="flex  text-[16px] md:text-[15px] justify-between">
                      <span>Service fee:</span>
                      <span className="text-fns-primary">
                        {formatMoney(totalFee)}
                      </span>
                    </div>
                    <div className="flex  text-[16px] md:text-[15px] justify-between">
                      <span>Ticket delivery by:</span>
                      <span className="text-fns-primary">
                        {listing.deliveryMethod || "Eventim"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mt-3">
                    <span className="font-semibold text-[#777] text-[20px]">
                      Fix price:
                    </span>
                    <span className=" text-[16px] md:text-[20px] font-medium text-fns-primary">
                      {formatMoney(totalFix)}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#777] text-right mt-0.5">
                    incl. vat
                  </p>

                  {listing.isPurchasable === false && (
                    <p className="mt-3 text-[12px] text-[#c92a2a]">
                      The ticket(s) in this offer can&apos;t be purchased at the
                      moment – please try again later.
                    </p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="bg-[#fabb01] text-white text-base font-medium w-full h-10 my-3 disabled:opacity-70 disabled:cursor-not-allowed relative"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing...
                      </span>
                    ) : (
                      "CHECKOUT"
                    )}
                  </button>

                  {timeRemaining && (
                    <div className="mt-3 mb-3 flex justify-between text-[12px]">
                      <span>Time remaining:</span>
                      <span>{timeRemaining}</span>
                    </div>
                  )}

                  <div className="flex  justify-between">
                    <span className="font-medium text-[14px]">Seat type:</span>
                    <span className="text-fns-primary text-[14px]">
                      Seat, Numbered
                    </span>
                  </div>

                  <div className="mb-5">
                    {listing.seatType && (
                      <div className="mt-1   flex justify-between text-[12px]">
                        <span>Seat type:</span>
                        <span>{listing.seatType}</span>
                      </div>
                    )}
                  </div>

                  {listing.description && (
                    <div className="mt-1  flex justify-between text-[12px]">
                      <span className="text-sm ">Description</span>
                      <span className="text-fns-primary text-sm">
                        {listing.description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
