/** @format */
"use client";

import { useMemo, useState } from "react";
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

  // checked[listingId][itemId] = boolean
  const [checked, setChecked] = useState<
    Record<string, Record<string, boolean>>
  >(() => {
    const init: Record<string, Record<string, boolean>> = {};
    for (const l of listings) {
      const items = Array.isArray(l.items) ? l.items : [];
      init[l.id] = Object.fromEntries(items.map((it: any) => [it.id, true]));
    }
    return init;
  });

  const formatMoney = (n: number) => `£ ${n.toFixed(2)}`;

  const formatOfferLine = (listing: any) => {
    const items = Array.isArray(listing.items) ? listing.items : [];
    const seats = items
      .map((it: any) => it.seatNumber)
      .filter(Boolean)
      .join(", ");

    const parts: string[] = [];
    parts.push("Circle Block 4");
    const row = items.find((it: any) => it.row)?.row;
    if (row) parts.push(`Row ${row}`);
    if (seats) parts.push(`Seat ${seats}`);
    parts.push("Circle");
    return parts.join(" | ");
  };

  const formatVariantLine = (it: any) => {
    const parts: string[] = [];
    parts.push("Circle Block 4");
    if (it.row) parts.push(`Row ${it.row}`);
    if (it.seatNumber) parts.push(`Seat ${it.seatNumber}`);
    parts.push("Circle");
    return parts.join(" | ");
  };

  const getSelectedItems = (listing: any) => {
    const items = Array.isArray(listing.items) ? listing.items : [];
    const map = checked[listing.id] || {};
    return items.filter((it: any) => map[it.id] !== false);
  };

  const calcTotals = (listing: any) => {
    const selected = getSelectedItems(listing);

    // ✅ qty is sum of variant quantities
    const qty = selected.reduce(
      (s: number, it: any) => s + Number(it.quantity ?? 1),
      0
    );

    // ✅ base total is basePrice * quantity
    const totalBase = selected.reduce(
      (sum: number, it: any) =>
        sum + Number(it.basePrice || 0) * Number(it.quantity ?? 1),
      0
    );

    const feePerTicket = Number(listing.serviceFeePerTicket || 0);
    const totalFee = feePerTicket * qty;

    const totalFix = totalBase + totalFee;

    return { qty, totalBase, totalFee, totalFix, selected };
  };

  const listingsSorted = useMemo(() => {
    return [...listings].sort((a: any, b: any) => {
      const ta = calcTotals(a).totalFix;
      const tb = calcTotals(b).totalFix;
      return ta - tb;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, checked]);

  const toggleVariant = (listingId: string, itemId: string) => {
    setChecked((prev) => ({
      ...prev,
      [listingId]: {
        ...(prev[listingId] || {}),
        [itemId]: !((prev[listingId]?.[itemId] ?? true) === true),
      },
    }));
  };

  const handleCheckout = async (listing: any) => {
    const { qty, selected } = calcTotals(listing);
    const selectedIds = selected.map((it: any) => it.id);

    if (qty <= 0) return;

    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const params = new URLSearchParams();
    params.set("qty", String(qty)); // ✅ total selected quantity (sum of variant quantities)
    params.set("items", selectedIds.join(",")); // ✅ selected variant ids

    router.push(`/tickets/all/${eventSlug}/pay?${params.toString()}`);
    setIsCheckingOut(false);
  };

  return (
    <div>
      {listingsSorted.map((listing: any) => {
        const items = Array.isArray(listing.items) ? listing.items : [];

        // ✅ backend offer quantity = sum of ALL item quantities
        const backendQty = items.reduce(
          (s: number, it: any) => s + Number(it.quantity ?? 1),
          0
        );

        const isOpen = openId === listing.id;
        const {
          qty: selectedQty,
          totalBase,
          totalFee,
          totalFix,
        } = calcTotals(listing);

        return (
          <div key={listing.id} className="border-[#e5e5e5] mt-1">
            {/* collapsed row */}
            <div
              className="flex gap-2 text-[13px] px-2 cursor-pointer"
              onClick={() => setOpenId(isOpen ? null : listing.id)}
            >
              {/* Quantity (read-only from backend) */}
              <div className="border-r md:ml-2 border-[#e5e5e5] py-3 text-center w-[74px]">
                <div className="text-[11px] md:text-[14px] font-medium text-[#555] mb-1">
                  Quantity
                </div>
                <div className="text-[15px] leading-[20px] font-semibold text-[#333]">
                  {backendQty}
                </div>
              </div>

              <div className="py-3 md:px-4 flex-1 min-w-0">
                <div className="text-[10px] md:text-[14px] text-[#333]">
                  {formatOfferLine(listing)}
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-[12px] md:text-[14px] font-normal md:font-medium text-fns-primary">
                    <span>Fixed price</span> {formatMoney(totalFix)}
                  </div>

                  <div className="ml-auto flex items-center gap-2 pr-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white">
                      <img className="w-5 md:w-10" src={shakeicon.src} alt="" />
                    </span>
                    <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white">
                      <img className="w-5 md:w-10" src={markicon.src} alt="" />
                    </span>
                    <img className="w-4 md:w-auto" src={moreicon.src} alt="" />
                  </div>
                </div>
              </div>
            </div>

            {/* expanded */}
            {isOpen && (
              <div className="border-t">
                <div className="bg-white">
                  {items.map((it: any) => {
                    const isChecked =
                      (checked[listing.id]?.[it.id] ?? true) === true;

                    return (
                      <div
                        key={it.id}
                        className="flex items-start gap-4 px-5 py-4 border-b"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleVariant(listing.id, it.id)}
                          className="mt-1 accent-gray-300 flex-shrink-0 w-5 h-5 opacity-80"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] text-[#333] leading-relaxed break-words">
                            {formatVariantLine(it)}
                          </div>

                          <div className="text-[12px] text-[#666] mt-1">
                            <span>
                              {listing.ticketType || "Full Price Ticket"}
                            </span>
                            <span> | </span>
                            <span>
                              Original price:{" "}
                              {formatMoney(Number(it.basePrice || 0))}
                            </span>
                          </div>
                        </div>

                        <div className="text-[13px] font-semibold text-[#003366] whitespace-nowrap flex-shrink-0">
                          {formatMoney(
                            Number(it.basePrice || 0) * Number(it.quantity ?? 1)
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-5 pb-4 pt-3 text-[12px] text-[#333] border-t border-[#e5e5e5]">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[15px]">
                      <span>Selected number of tickets:</span>
                      <span className="text-fns-primary">{selectedQty}</span>
                    </div>

                    <div className="flex justify-between text-[15px]">
                      <span>Offer splitting:</span>
                      <span>Total</span>
                    </div>

                    <div className="flex justify-between text-[15px]">
                      <span>Tickets total:</span>
                      <span className="text-fns-primary">
                        {formatMoney(totalBase)}
                      </span>
                    </div>

                    <div className="flex justify-between text-[15px]">
                      <span>Service fee:</span>
                      <span className="text-fns-primary">
                        {formatMoney(totalFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-[15px]">
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
                    <span className="text-[16px] md:text-[20px] font-medium text-fns-primary">
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
                    onClick={() => handleCheckout(listing)}
                    disabled={isCheckingOut || selectedQty === 0}
                    className="bg-[#fabb01] text-white text-base font-medium w-full h-10 my-3 disabled:opacity-70 disabled:cursor-not-allowed relative"
                  >
                    {isCheckingOut
                      ? "Processing..."
                      : selectedQty === 0
                      ? "SELECT TICKETS"
                      : "CHECKOUT"}
                  </button>

                  <div className="flex justify-between mt-2">
                    <span className="font-medium text-[14px]">Seat type:</span>
                    <span className="text-fns-primary text-[14px]">
                      Seat, Numbered
                    </span>
                  </div>

                  {listing.description && (
                    <div className="mt-2 flex justify-between text-[12px]">
                      <span className="text-sm">Description</span>
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
