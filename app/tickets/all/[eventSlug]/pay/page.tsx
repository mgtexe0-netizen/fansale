/** @format */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("buyerInfo", JSON.stringify(formData));

    router.push("/payment");
  };

  return (
    <div className="max-w-2xl  min-h-[60vh] mx-auto px-4 py-8">
      <div className="bg-white  shadow-sm border p-6">
        {/* <h2 className="text-xl md:text-2xl font-semibold text-[#003366] mb-6">
          Buyer Information
        </h2> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-[#333] mb-2">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300  text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-[#333] mb-2">
              Last Name
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
              placeholder="Enter last name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fns-primary text-white py-3  text-xs md:text-sm font-semibold  transition-colors mt-6"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
