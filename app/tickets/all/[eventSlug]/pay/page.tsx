/** @format */

"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const sp = useSearchParams();

  // items = comma-separated variant ids
  const itemIds = useMemo(() => {
    const raw = sp.get("items") || "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [sp]);

  const qtyFromQuery = Number(sp.get("qty") || 0);

  // ✅ prefer items.length (more reliable), fallback to qty
  const qty = itemIds.length > 0 ? itemIds.length : qtyFromQuery;

  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: Math.max(qty, 0) }, () => "")
  );

  React.useEffect(() => {
    setNames((prev) => {
      const next = Array.from(
        { length: Math.max(qty, 0) },
        (_, i) => prev[i] ?? ""
      );
      return next;
    });
  }, [qty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = names.map((n) => n.trim());
    if (trimmed.some((n) => !n)) return;

    localStorage.setItem(
      "ticketOwners",
      JSON.stringify({
        qty,
        itemIds,
        names: trimmed,
      })
    );

    // If you want to navigate after saving, uncomment and set your route:
    // router.push("/payment");
  };

  return (
    <div className="max-w-2xl min-h-[60vh] mx-auto px-4 py-8">
      <div className="bg-white shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {qty <= 0 ? (
            <p className="text-sm text-gray-600">
              Nessun biglietto selezionato. Torna indietro e seleziona i
              biglietti.
            </p>
          ) : (
            <>
              {names.map((value, idx) => (
                <div key={idx}>
                  <label className="block text-xs md:text-sm font-medium text-[#333] mb-2">
                    Nome e cognome del titolare del biglietto (Biglietto{" "}
                    {idx + 1})
                  </label>
                  <input
                    type="text"
                    required
                    value={value}
                    onChange={(e) => {
                      const v = e.target.value;
                      setNames((prev) => {
                        const next = [...prev];
                        next[idx] = v;
                        return next;
                      });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                    placeholder="Inserisci nome e cognome (es. Mario Rossi)"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-fns-primary text-white py-3 text-xs md:text-sm font-semibold transition-colors mt-6 disabled:opacity-60"
                disabled={qty <= 0 || names.some((n) => !n.trim())}
              >
                Continua al pagamento
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
