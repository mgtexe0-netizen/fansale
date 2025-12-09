/** @format */

"use client";
import React from "react";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/overview">
              <h1 className="text-2xl font-bold text-pilot-purple-primary bg-clip-text  cursor-pointer">
                Admin
              </h1>
            </Link>

            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <Link href="/admin/overview">
                <button
                  className={`px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${
                    isActive("/admin/overview")
                      ? "bg-white text-fns-primary shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Overview
                </button>
              </Link>
              <Link href="/admin/event/create">
                <button
                  className={`px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${
                    isActive("/admin/event/create")
                      ? "bg-white text-fns-primar shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Create event
                </button>
              </Link>
              <Link href="/admin/event/all">
                <button
                  className={`px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${
                    isActive("/admin/event/all")
                      ? "bg-white text-fns-primar shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Event list
                </button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
      </div>
    </nav>
  );
}
