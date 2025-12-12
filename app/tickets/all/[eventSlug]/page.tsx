/** @format */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventHeader from "@/features/event/components/header";
import { TicketCard } from "@/features/event/components/ticket-card";
import mapimg from "../../../../public/map.png";
import locationicon from "../../../../public/mapicon.png";
import locationicon2 from "../../../../public/location.png";


type PageProps = {
  params: Promise<{ eventSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { eventSlug } = await params; 

  const event = await prisma.event.findUnique({
    where: { slug: eventSlug },
    select: {
      title: true,
      venue: true,
      city: true,
    },
  });

  if (!event) {
    return { title: "Event not found | fanSALE" };
  }

  const description = `Buy and sell tickets for ${event.title}${
    event.venue ? ` at ${event.venue}` : ""
  }${event.city ? `, ${event.city}` : ""}. Secure resale via fanSALE.`;

  return {
    title: `${event.title} Tickets | fanSALE`,
    description,
  };
}
async function getEvent(eventSlug: string) {
  return prisma.event.findUnique({
    where: { slug: eventSlug },
    include: {
      listings: {
        where: { status: "available" },
        include: {
          items: true, 
        },
      },
    },
  });
}


export default async function EventPage({ params }: PageProps) {
  const { eventSlug } = await params; 
  const event = await getEvent(eventSlug);

  if (!event) notFound();

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-4 ">
      <EventHeader event={event} />

      <div className="max-w-[1150px] mx-auto mt-4 bg-white border border-[#d7d7d7] shadow-sm block md:hidden">
        <div className="px-4 pt-3 text-[24px] font-normal text-[#003366]">
          Seat map
        </div>

        <div className="h-[260px] flex items-center justify-center">
          <div className="relative w-[90%] h-[80%] bg-white flex items-center justify-center text-[12px] text-[#999]">
            <img
              className="w-full h-full object-cover"
              src={mapimg.src}
              alt=""
            />
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] px-4 py-2 text-[13px] text-[#575656] flex items-center gap-10">
          <div className="flex items-center hidden md:block">
            <span>Selected seats </span> <img src={locationicon.src} alt="" />
          </div>{" "}
          <div className="flex items-center">
            <span className="font-bold">Available offers</span>
            <img className="w-5" src={locationicon2.src} alt="" />
          </div>{" "}
        </div>
      </div>

      {/* Tickets + DESKTOP seat map (inside TicketCard) */}
      <TicketCard eventSlug={event.slug} listings={event.listings} />

      <div className="flex flex-col gap-3">
        <div className="mx-auto mt-8 bg-white border border-[#d7d7d7] shadow-lg px-6 py-4">
          <h2 className="text-fns-primary mb-2 text-2xl font-medium">
            Search agent
          </h2>
          <hr className="my-3" />
          <p className="text-sm">
            Is there nothing suitable for you? Our search agent informs you as
            soon as suitable offers for your desired event are available on
            fanSALE. Simply set up your search criteria and receive suitable
            offers by e-mail at the desired interval.{" "}
            <span className="text-fns-primary font-semibold">
              Create a search agent
            </span>
          </p>
        </div>

        <div className="mx-auto bg-white border border-[#d7d7d7] shadow-lg px-6 py-4">
          <h2 className="text-fns-primary mb-2 text-2xl font-medium">
            Sell tickets
          </h2>
          <hr className="my-3" />
          <p className="text-sm">
            You bought tickets for Nashville In Concert: The Encore Tour at
            Friday, 13/02/2026 19:00, Eventim Apollo, W6 9QH LONDON but don't
            have time to go? No problem: with fanSALE you can simply, quickly
            and securely sell your admission tickets through Eventim&apos;s
            online ticket market. In this way, you can sell your tickets legally
            and respectably to true fans, even for sold-out events.
            <span className="text-fns-primary font-semibold">
              {" "}
              Sell tickets
            </span>
          </p>
        </div>

        <div className="mx-auto bg-white border border-[#d7d7d7] shadow-lg px-6 py-4">
          <h4 className="text-fns-primary mb-2 font-bold text-[14px]">
            Our Recommendations
          </h4>
          <p className="text-sm text-fns-primary font-medium leading-loose">
            Riverdance Tickets | Inside No. 9 Stage/Fright Tickets | The Girls
            Bathroom Tickets | Greg Davies Tickets | Stardew Valley: Symphony of
            Seasons Tickets | Leon Thomas Tickets | Ray Lamontagne Tickets |
            Louis C.K. Tickets | Chris Ramsey Tickets | Nashville in Concert
            Tickets
          </p>
        </div>
      </div>
    </div>
  );
}
