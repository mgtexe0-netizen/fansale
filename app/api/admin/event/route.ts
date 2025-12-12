/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // console.log("Received body:", body);

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

    // console.log("Extracted fields:", {
    //   title,
    //   slug,
    //   description,
    //   coverImage,
    //   venue,
    //   date,
    //   city,
    // });

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
        create: normalizedListings.map((l: any) => ({
          ticketType: l.ticketType,
          row: l.row ?? null,
          seatNumbers: l.seatNumbers ?? null,
          description: l.description ?? null,

          originalPricePerTicket:
            l.originalPricePerTicket != null
              ? Number(l.originalPricePerTicket)
              : null,
          serviceFeePerTicket:
            l.serviceFeePerTicket != null
              ? Number(l.serviceFeePerTicket)
              : null,

          deliveryMethod: l.deliveryMethod ?? "Eventim",
          isPurchasable:
            typeof l.isPurchasable === "boolean" ? l.isPurchasable : true,
          expiresAt: l.expiresAt ? new Date(l.expiresAt) : null,
        })),
      };
    }

    const event = await prisma.event.create({
      data,
      include: {
        listings: true,
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
