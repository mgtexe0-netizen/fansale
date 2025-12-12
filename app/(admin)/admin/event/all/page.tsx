/** @format */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getAllEvents() {
const events = await prisma.event.findMany({
  orderBy: { date: "asc" },
  include: {
    listings: {
      where: { status: "available" },
      include: {
        items: true, 
      },
    },
  },
});


  return events.map((event) => {
    const minPrice = event.listings.reduce((min, listing) => {
      const items = listing.items ?? [];
      const qty = items.length;

      // sum of variant prices
      const baseTotal = items.reduce(
        (sum, it) => sum + Number(it.basePrice || 0),
        0
      );

      // fee per ticket * qty
      const feePerTicket = Number(listing.serviceFeePerTicket || 0);
      const totalFee = feePerTicket * qty;

      const fixedPrice = baseTotal + totalFee;

      // ignore empty offers (no variants)
      if (qty === 0) return min;

      return fixedPrice < min ? fixedPrice : min;
    }, Infinity);

    return {
      ...event,
      minPrice: minPrice === Infinity ? null : minPrice,
      availableCount: event.listings.length,
    };
  });
}

export default async function AllEvents() {
  const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">All Events</h1>
          <p className="text-lg opacity-90">
            Browse all available events and tickets
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {events.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow">
            <p className="text-gray-500 text-xl">No events available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              const formattedDate = eventDate.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <Link
                  key={event.id}
                  href={`/tickets/all/${event.slug}`}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">
                      {event.title}
                    </h2>

                    <div className="space-y-2 text-gray-600 mb-4">
                      <p className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formattedDate}
                      </p>

                      <p className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 0 016 0z"
                          />
                        </svg>
                        {event.venue}, {event.city}
                      </p>

                      <p className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                          />
                        </svg>
                        {event.availableCount} offer
                        {event.availableCount !== 1 ? "s" : ""} available
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">From</p>
                        <p className="text-2xl font-bold text-blue-900">
                          {event.minPrice != null
                            ? `£${event.minPrice.toFixed(2)}`
                            : "N/A"}
                        </p>
                      </div>
                      <div className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded">
                        View Tickets
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
