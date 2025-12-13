/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      description,
      coverImage,
      venue,
      date,
      city,
      listings,
    } = body;

    const normalizedListings = Array.isArray(listings) ? listings : [];

    const data: any = {
      title,
      slug,
      description,
      coverImage,
      venue,
      date: new Date(date),
      city,
    };

    if (normalizedListings.length > 0) {
      data.listings = {
        create: normalizedListings.map((l: any) => {
          const items = Array.isArray(l.items) ? l.items : [];

          return {
            ticketType: l.ticketType,
            description: l.description ?? null,
            deliveryMethod: l.deliveryMethod ?? "Eventim",
            serviceFeePerTicket: Number(l.serviceFeePerTicket ?? 0),
            isPurchasable:
              typeof l.isPurchasable === "boolean" ? l.isPurchasable : true,
            expiresAt: l.expiresAt ? new Date(l.expiresAt) : null,
            status: "available",

            items: {
              create: items.map((it: any) => ({
                row: it.row ?? null,
                seatNumber: it.seatNumber ?? null,
                // description: it.description ?? null,
                basePrice: Number(it.basePrice),
              })),
            },
          };
        }),
      };
    }

    const event = await prisma.event.create({
      data,
      include: {
        listings: {
          include: { items: true },
        },
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const event = await prisma.event.findUnique({
        where: { slug },
        include: {
          listings: {
            where: { status: "available" },
            include: { items: true },
          },
        },
      });

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    }

    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        listings: {
          where: { status: "available" },
          include: { items: true },
        },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
