/** @format */

import Image from "next/image";
import Link from "next/link";

export default function EventHeader({ event }: { event: any }) {
  const eventDate = new Date(event.date);

  const weekday = eventDate.toLocaleDateString("en-GB", {
    weekday: "long",
  });
  const dayPart = eventDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timePart = eventDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const lineText = `${weekday}, ${dayPart} ${timePart}, ${
    event.venue
  }, ${event.city.toUpperCase()}`;

  const breadcrumbLast = `${
    event.city.split(" ").pop() ?? event.city.toUpperCase()
  }, ${weekday.slice(0, 3)} ${dayPart}`;

  return (
    <header className="mt-4">
      {/* breadcrumbs bar */}
      <div className="mx-auto text-[12px] hidden md:block text-[#333] py-2 px-4">
        <span className="text-[#003366]">fanSALE</span>
        <span className="mx-1">›</span>
        <Link href="/concerts" className="text-[#003366] hover:underline">
          Concerts
        </Link>
        <span className="mx-1">›</span>
        <Link
          href="/concerts/country-and-folk"
          className="text-[#003366] hover:underline"
        >
          Country and Folk
        </Link>
        <span className="mx-1">›</span>
        <span className="text-[#003366]">Nashville in Concert</span>
        <span className="mx-1">›</span>
        <span className="font-semibold">{breadcrumbLast}</span>
      </div>

      {/* cover + overlapping poster */}
      <div className="mx-auto pb-4">
        <div className="relative">
          {/* backdrop */}
          <div
            className="h-[120px] md:h-[150px] overflow-hidden shadow-sm relative"
            style={{
              backgroundImage: `url(${event.coverImage})`,
            }}
          >
            {/* blur + gradient */}
            <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-r from-black/80 via-black/60 to-black/70" />

            {/* text area */}
            <div className="relative h-full pl-38 md:pl-[210px] pr-4 md:pr-6 flex flex-col justify-center">
              <h1 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white mb-1 md:mb-2 leading-snug">
                {event.title}
              </h1>

              {/* date / venue: desktop only (on cover) */}
              <p className="hidden md:block text-[16px] md:text-[18px] font-medium text-white">
                {lineText}
              </p>
            </div>
          </div>

          {/* overlapping square poster */}
          <div className="absolute left-3 md:left-6 -bottom-1 md:-bottom-8">
            <div className="w-[110px] h-[110px] md:w-[170px] md:h-[170px] bg-white rounded-sm shadow-[0_4px_8px_rgba(0,0,0,0.4)] p-[4px]">
              <div className="relative w-full h-full">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover rounded-[2px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* white strip: holds date/venue on mobile, spacer on desktop */}
        <div className="w-full bg-white shadow-lg pt-5 pb-4 px-5 md:h-20 md:pt-0 md:pb-0 md:px-0 flex items-center">
          {/* mobile: show date / venue line here */}
          <p className="block md:hidden text-[20px] font-medium text-fns-primary leading-snug">
            {lineText}
          </p>
        </div>
      </div>
    </header>
  );
}
