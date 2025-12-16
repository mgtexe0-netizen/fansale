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
    return { title: "Evento non trovato | fanSALE" };
  }

  const description = `Compra e vendi biglietti per ${event.title}${
    event.venue ? ` presso ${event.venue}` : ""
  }${event.city ? `, ${event.city}` : ""}. Rivendita sicura tramite fanSALE.`;

  return {
    title: `Biglietti ${event.title} | fanSALE`,
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
          Mappa dei posti
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
            <span>Posti selezionati </span>{" "}
            <img src={locationicon.src} alt="" />
          </div>{" "}
          <div className="flex items-center">
            <span className="font-bold">Offerte disponibili</span>
            <img className="w-5" src={locationicon2.src} alt="" />
          </div>{" "}
        </div>
      </div>

      {/* Biglietti + mappa posti DESKTOP (dentro TicketCard) */}
      <TicketCard eventSlug={event.slug} listings={event.listings} />

      <div className="flex flex-col gap-3">
        <div className="mx-auto mt-8 bg-white border border-[#d7d7d7] shadow-lg px-6 py-4">
          <h2 className="text-fns-primary mb-2 text-2xl font-medium">
            Agente di ricerca
          </h2>
          <hr className="my-3" />
          <p className="text-sm">
            Non c’è nulla di adatto per te? Il nostro agente di ricerca ti
            avvisa non appena sono disponibili offerte adatte per il tuo evento
            desiderato su fanSALE. Imposta semplicemente i tuoi criteri di
            ricerca e ricevi le offerte via e-mail con l’intervallo desiderato.{" "}
            <span className="text-fns-primary font-semibold">
              Crea un agente di ricerca
            </span>
          </p>
        </div>

        <div className="mx-auto bg-white border border-[#d7d7d7] shadow-lg px-6 py-4">
          <h2 className="text-fns-primary mb-2 text-2xl font-medium">
            Vendi biglietti
          </h2>
          <hr className="my-3" />
          <p className="text-sm">
            Hai acquistato biglietti per Nashville In Concert: The Encore Tour
            venerdì, 13/02/2026 19:00, Eventim Apollo, W6 9QH LONDON ma non hai
            tempo per andare? Nessun problema: con fanSALE puoi vendere i tuoi
            biglietti d’ingresso in modo semplice, rapido e sicuro tramite il
            mercato online di Eventim. In questo modo, puoi vendere i tuoi
            biglietti legalmente e in modo affidabile a veri fan, anche per
            eventi sold-out.
            <span className="text-fns-primary font-semibold">
              {" "}
              Vendi biglietti
            </span>
          </p>
        </div>

        <div className="mx-auto bg-white border border-[#d7d7d7] shadow-lg px-6 py-4">
          <h4 className="text-fns-primary mb-2 font-bold text-[14px]">
            I nostri consigli
          </h4>
          <p className="text-sm text-fns-primary font-medium leading-loose">
            Biglietti Riverdance | Biglietti Inside No. 9 Stage/Fright |
            Biglietti The Girls Bathroom | Biglietti Greg Davies | Stardew
            Valley: Symphony of Seasons | Biglietti Leon Thomas | Biglietti Ray
            Lamontagne | Biglietti Louis C.K. | Biglietti Chris Ramsey |
            Biglietti Nashville in Concert
          </p>
        </div>
      </div>
    </div>
  );
}
