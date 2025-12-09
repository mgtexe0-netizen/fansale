/** @format */

// app/features/event/components/ticketlist.tsx
"use client";

import { useState } from "react";

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
  // quantity per listing (default 1)
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(listings.map((l) => [l.id, 1]))
  );

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
            {/* MAIN ROW */}
            <div
              className="flex gap-2 text-[13px] px-2 cursor-pointer"
              onClick={() => setOpenId(isOpen ? null : listing.id)}
            >
              <div className="border-r ml-2 border-[#e5e5e5] py-3 text-center">
                <div className="text-[14px] mr-3 font-medium text-[#555] mb-1">
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
                  className="w-10 mx-auto border-0 rounded-sm text-center text-[15px] leading-[20px] focus:outline-none focus:ring-1 focus:ring-[#003399]"
                />
              </div>

              {/* Middle content */}
              <div className="py-3 px-4 flex-1">
                <div className="text-[14px] text-[#333] mb-1">
                  {formatSeatLine(listing)}
                </div>

                <div className="flex items-center gap-7">
                  <div className="text-[14px] font-medium text-fns-primary">
                    Fixed price {formatMoney(listing.perTicket)}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-[#1c7ed6] text-[#1c7ed6] text-[10px]">
                      🤝
                    </span>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-[#37b24d] text-[#37b24d] text-[11px]">
                      ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Yellow arrow */}
              <div className="flex items-center justify-center pr-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f9b233] text-[#444] text-[14px]">
                  ›
                </span>
              </div>
            </div>

            {/* DROPDOWN DETAILS */}
            {isOpen && (
              <div className="px-5 pb-4 pt-3 bg-[#fafafa] text-[12px] text-[#333] border-t border-[#e5e5e5]">
                <div className="flex px-5 gap-2 items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="accent-[#003399]"
                    />
                    <div className="text-[15px] px-10 m-1 text-[#333]">
                      {formatSeatLine(listing)} |{" "}
                      {listing.ticketType || "Full Price Ticket"}{" "}
                      {listing.original ? (
                        <>| Original price: {formatMoney(listing.original)}</>
                      ) : null}
                    </div>
                  </div>

                  <div className="text-[13px] font-semibold text-[#003366]">
                    {formatMoney(listing.original)}
                  </div>
                </div>

                <hr className="border-[#e0e0e0] mb-3" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[15px]">
                      Selected number of tickets:
                    </span>
                    <span className="text-[15px] text-fns-primary">{qty}</span>
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
                  <div className="flex text-[15px] justify-between">
                    <span>Service fee:</span>
                    <span className="text-fns-primary">
                      {formatMoney(totalFee)}
                    </span>
                  </div>
                  <div className="flex text-[15px] justify-between">
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
                  <span className="text-[20px] font-medium text-fns-primary">
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

                <button className="bg-[#fabb01] text-white text-base font-medium w-full h-10 my-3">
                  CHECKOUT
                </button>

                {timeRemaining && (
                  <div className="mt-3 mb-3 flex justify-between text-[12px]">
                    <span>Time remaining:</span>
                    <span>{timeRemaining}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-medium text-[14px]">Seat type:</span>
                  <span className="text-fns-primary text-[14px]">
                    Seat, Numbered
                  </span>
                </div>

                {listing.seatType && (
                  <div className="mt-1 flex justify-between text-[12px]">
                    <span>Seat type:</span>
                    <span>{listing.seatType}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
