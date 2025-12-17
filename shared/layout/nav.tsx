/** @format */

"use client";

import Link from "next/link";

const EXT = {
  home: "https://www.fansale.it/",
  sell: "https://www.fansale.it/fansale/sell.htm",
  login: "https://www.fansale.it/fansale/login.htm",
  search: "https://www.fansale.it/",
  menu: "https://www.fansale.it/?help=about",
};

export default function MainNavbar() {
  return (
    <header className="w-full bg-[#002b55] text-white shadow-md">
      <div className="mx-auto max-w-[1200px] px-3 py-2">
        {/* DESKTOP (>= md) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Logo */}
          <Link
            href={EXT.home}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[28px] font-bold leading-none"
          >
            <span className="text-white">fan</span>
            <span className="text-[#feca27]">SALE</span>
          </Link>

          {/* Search bar (kept UI, but submit opens official site) */}
          <form
            className="flex-1 flex items-stretch ml-2"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(EXT.search, "_blank", "noopener,noreferrer");
            }}
          >
            <input
              type="text"
              placeholder="Cerca evento, artista, luogo"
              className="w-full h-[32px] rounded-none border border-[#c4c4c4] bg-white px-3 text-[13px] text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="w-[40px] h-[32px] flex items-center justify-center bg-white border border-l-0 border-[#c4c4c4] text-[#002b55]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-stretch gap-2 ml-2">
            <Link
              href={EXT.sell}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 inline-flex items-center justify-center bg-[#074477] hover:bg-[#0b578f] text-[13px] font-semibold rounded-none h-[32px]"
            >
              Vendi
            </Link>

            <Link
              href={EXT.login}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 inline-flex items-center justify-center bg-[#074477] hover:bg-[#0b578f] text-[13px] font-semibold rounded-none h-[32px]"
            >
              Accedi
            </Link>

            <Link
              href={EXT.menu}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[60px] h-[32px] bg-[#074477] hover:bg-[#0b578f] flex flex-col items-center justify-center rounded-none leading-tight"
            >
              <span className="mb-[1px]">
                <span className="block w-4 h-[2px] bg-white mb-[3px]" />
                <span className="block w-4 h-[2px] bg-white mb-[3px]" />
                <span className="block w-4 h-[2px] bg-white" />
              </span>
              <span className="text-[10px]">Menu</span>
            </Link>
          </div>
        </div>

        {/* MOBILE (< md) */}
        <div className="flex flex-col gap-2 md:hidden">
          {/* top row: logo + icon buttons */}
          <div className="flex items-center justify-between">
            <Link
              href={EXT.home}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[24px] leading-none font-bold"
            >
              <span className="text-white">fan</span>
              <span className="text-[#feca27]">SALE</span>
            </Link>

            <div className="flex items-center gap-1">
              {/* top search square */}
              <Link
                href={EXT.search}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[32px] bg-white flex items-center justify-center text-[#002b55]"
                aria-label="Cerca su fanSALE Italia"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                >
                  <circle cx="11" cy="11" r="6" />
                  <line x1="16" y1="16" x2="21" y2="21" />
                </svg>
              </Link>

              {/* menu square */}
              <Link
                href={EXT.menu}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[48px] h-[32px] bg-[#074477] flex flex-col items-center justify-center leading-none"
                aria-label="Menu su fanSALE Italia"
              >
                <span className="mb-[1px]">
                  <span className="block w-4 h-[2px] bg-white mb-[3px]" />
                  <span className="block w-4 h-[2px] bg-white mb-[3px]" />
                  <span className="block w-4 h-[2px] bg-white" />
                </span>
                <span className="text-[9px] mt-[1px]">Menu</span>
              </Link>
            </div>
          </div>

          {/* middle row: long search bar with icon inside */}
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(EXT.search, "_blank", "noopener,noreferrer");
            }}
          >
            <input
              type="text"
              placeholder="Cerca evento, artista, luogo"
              className="w-full h-[32px] rounded-none border border-[#c4c4c4] bg-white pl-3 pr-8 text-[13px] text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center text-[#002b55]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
            </button>
          </form>

          {/* bottom row: Sell / Login full-width buttons */}
          <div className="flex gap-2 mt-1">
            <Link
              href={EXT.sell}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-[32px] bg-[#074477] hover:bg-[#0b578f] text-center text-[13px] font-semibold flex items-center justify-center"
            >
              Vendi
            </Link>
            <Link
              href={EXT.login}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-[32px] bg-[#074477] hover:bg-[#0b578f] text-center text-[13px] font-semibold flex items-center justify-center"
            >
              Accedi
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
