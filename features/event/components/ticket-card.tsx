/** @format */

"use client";

import { useState } from "react";
import { TicketList } from "./ticketlist";
import { AlignLeft, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

type TicketCardProps = {
  eventSlug: string;
  listings: any[];
};

export function TicketCard({ eventSlug, listings }: TicketCardProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const hasOpen = openId !== null;

  return (
    <div className="mx-auto mt-4 bg-white border border-[#d7d7d7] shadow-sm">
      {/* header row */}
      <div className="flex">
        <div className="flex-1 border-r border-[#d7d7d7]">
          <div className="flex border-b md:items-center flex-col md:flex-row justify-between px-3 md:px-6 py-3">
            <h2 className="text-[22px] mb-4 md:mb-0 font-medium text-[#003366]">
              {hasOpen ? (
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="flex items-center gap-2 text-[#003366] hover:underline"
                >
                  <span className="text-[22px] cursor-pointer -mt-[2px]">
                    {" "}
                    <ChevronLeft />
                  </span>
                  <span>Back to all offers</span>
                </button>
              ) : (
                "Tickets"
              )}
            </h2>

            <div className=" hidden md:block gap-2">
              <button className="inline-flex mr-2 items-center gap-1 border border-[#b7b7b7] bg-white px-4 py-1.5 text-[12px] text-[#333] rounded-sm shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                Filters
                <span className="text-xs">⋮⋮</span>
              </button>
              <button className="inline-flex items-center gap-1 border border-[#b7b7b7] bg-white px-4 py-1.5 text-[12px] text-[#333] rounded-sm shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                Sorting
                <span className="text-xs">↕</span>
              </button>
            </div>
          </div>
        </div>

        {/* map header icons – desktop only, as you had */}
        <div className="hidden lg:flex w-[60%] items-center justify-end px-4 py-2 border-b border-[#d7d7d7]">
          <div className="flex gap-2">
            <button className="w-8 h-8 border border-[#b7b7b7] bg-white flex items-center justify-center text-xs shadow-[0_1px_0_rgba(0,0,0,0.08)]">
              ⌂
            </button>
            <button className="w-8 h-8 border border-[#b7b7b7] bg-white flex items-center justify-center text-xs shadow-[0_1px_0_rgba(0,0,0,0.08)]">
              🔍
            </button>
            <button className="w-8 h-8 border border-[#f9b233] bg-white flex items-center justify-center text-xs shadow-[0_1px_0_rgba(0,0,0,0.08)]">
              ⊕
            </button>
          </div>
        </div>
      </div>

      {/* body: tickets + desktop seat map */}
      <div className="flex">
        {/* tickets */}
        <div className="flex-1 border-r border-[#d7d7d7]">
          <TicketList
            eventSlug={eventSlug}
            listings={listings}
            openId={openId}
            setOpenId={setOpenId}
          />
        </div>

        {/* desktop seat map */}
        <div className="hidden md:block w-[60%]">
          <div className="h-[480px] flex items-center justify-center">
            <div className="relative w-[90%] h-[80%] bg-white flex items-center justify-center text-[12px] text-[#999]">
              Seat map placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
