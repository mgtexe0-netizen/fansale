/** @format */
"use client";

import React from "react";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const tabClass = (active: boolean) =>
    `shrink-0 px-4 md:px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-white text-fns-primary shadow-sm"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* header row */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/admin/overview" className="shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-pilot-purple-primary cursor-pointer">
              Admin
            </h1>
          </Link>

          {/* right icons (show on mobile too) */}
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <Link href="/dashboard/settings">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* tabs row */}
        <div className="mt-3 md:mt-0 md:ml-0">
          <div className="bg-gray-100 p-1 rounded-lg w-full md:w-fit">
            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
              <Link href="/admin/overview">
                <button className={tabClass(isActive("/admin/overview"))}>
                  Overview
                </button>
              </Link>

              <Link href="/admin/event/create">
                <button className={tabClass(isActive("/admin/event/create"))}>
                  Create event
                </button>
              </Link>

              <Link href="/admin/event/all">
                <button className={tabClass(isActive("/admin/event/all"))}>
                  Event list
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
