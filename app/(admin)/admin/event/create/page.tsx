/** @format */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import axios from "axios";
import { toast } from "sonner";

type ListingItem = {
  row: string;
  seatNumber: string;
  basePrice: number | null;
  // description: string;
};

type Listing = {
  ticketType: string;
  description: string;
  deliveryMethod: string;
  serviceFeePerTicket: number; 
  isPurchasable: boolean;
  expiresAt: string;
  items: ListingItem[];
};

export default function CreateEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    venue: "",
    city: "",
    date: "",
  });

  const emptyItem: ListingItem = {
    row: "",
    seatNumber: "",
    basePrice: null,
    // description: "",
  };

  const [listings, setListings] = useState<Listing[]>([
    {
      ticketType: "",
      description: "",
      deliveryMethod: "Eventim",
      serviceFeePerTicket: 0,
      isPurchasable: true,
      expiresAt: "",
      items: [emptyItem],
    },
  ]);

  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEventData({ ...eventData, [e.target.name]: e.target.value });

  const handleListingChange = (
    listingIndex: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setListings((prev) => {
      const next = [...prev];
      let nextValue: any = value;

      if (type === "number") {
        nextValue = value === "" ? 0 : Number(value);
      } else if (type === "checkbox") {
        nextValue = (e.target as HTMLInputElement).checked;
      }

      next[listingIndex] = { ...next[listingIndex], [name]: nextValue };
      return next;
    });
  };

  const handleItemChange = (
    listingIndex: number,
    itemIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setListings((prev) => {
      const next = [...prev];
      const listing = next[listingIndex];

      const items = [...listing.items];
      let nextValue: any = value;

      if (type === "number") {
        if (name === "basePrice")
          nextValue = value === "" ? null : Number(value);
        if (name === "quantity")
          nextValue = value === "" ? 1 : Math.max(1, Math.floor(Number(value)));
      }

      items[itemIndex] = { ...items[itemIndex], [name]: nextValue };

      next[listingIndex] = { ...listing, items };
      return next;
    });
  };

  const addListing = () => {
    setListings((prev) => [
      ...prev,
      {
        ticketType: "",
        description: "",
        deliveryMethod: "Eventim",
        serviceFeePerTicket: 0,
        isPurchasable: true,
        expiresAt: "",
        items: [emptyItem],
      },
    ]);
  };

  const removeListing = (index: number) => {
    setListings((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );
  };

  const addVariant = (listingIndex: number) => {
    setListings((prev) => {
      const next = [...prev];
      const l = next[listingIndex];
      if (l.items.length >= 4) return prev;

      next[listingIndex] = {
        ...l,
        items: [...l.items, { ...emptyItem }],
      };
      return next;
    });
  };

  const removeVariant = (listingIndex: number, itemIndex: number) => {
    setListings((prev) => {
      const next = [...prev];
      const l = next[listingIndex];
      if (l.items.length === 1) return prev;

      next[listingIndex] = {
        ...l,
        items: l.items.filter((_, i) => i !== itemIndex),
      };
      return next;
    });
  };

  const generateSlug = () => {
    const slug = eventData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setEventData({ ...eventData, slug });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (const l of listings) {
        if (!l.ticketType)
          throw new Error("Each listing must have a ticket type.");
        if (!Array.isArray(l.items) || l.items.length < 1)
          throw new Error("Each listing must have at least 1 variant.");
        if (l.items.length > 4)
          throw new Error("A listing can have at most 4 variants.");

        for (const it of l.items) {
          if (it.basePrice == null || Number.isNaN(it.basePrice)) {
            throw new Error("Each variant must have a valid seat price.");
          }
        }
      }

      const payload = { ...eventData, listings };
      await axios.post("/api/admin/event", payload);

      toast.success("Event Successfully created");
      router.refresh(); 

    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-10 space-y-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Create Event</h1>

      <form className="space-y-12" onSubmit={handleSubmit}>
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Event Details</h2>

          <input
            name="title"
            placeholder="Event Title"
            required
            className="input"
            value={eventData.title}
            onChange={handleEventChange}
          />

          <div className="flex gap-2">
            <input
              name="slug"
              placeholder="event-slug"
              required
              className="input flex-1"
              value={eventData.slug}
              onChange={handleEventChange}
            />
            <Button type="button" onClick={generateSlug}>
              Generate
            </Button>
          </div>

          <textarea
            name="description"
            rows={4}
            placeholder="Description"
            required
            className="input"
            value={eventData.description}
            onChange={handleEventChange}
          />

          <input
            type="url"
            name="coverImage"
            placeholder="Cover Image URL"
            required
            className="input"
            value={eventData.coverImage}
            onChange={handleEventChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="venue"
              placeholder="Venue"
              required
              className="input"
              value={eventData.venue}
              onChange={handleEventChange}
            />

            <input
              type="datetime-local"
              name="date"
              required
              className="input"
              value={eventData.date}
              onChange={handleEventChange}
            />
          </div>

          <input
            name="city"
            placeholder="City"
            required
            className="input"
            value={eventData.city}
            onChange={handleEventChange}
          />
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Ticket Listings (Offers)</h2>

          {listings.map((listing, listingIndex) => (
            <div key={listingIndex} className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium">Ticket type</label>
                  <input
                    name="ticketType"
                    placeholder="Full Price Ticket"
                    className="input"
                    value={listing.ticketType}
                    onChange={(e) => handleListingChange(listingIndex, e)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">
                    Offer description (optional)
                  </label>
                  <textarea
                    name="description"
                    placeholder="Offer Description"
                    className="input"
                    value={listing.description}
                    onChange={(e) => handleListingChange(listingIndex, e)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Service fee per ticket (£)
                  </label>
                  <input
                    type="number"
                    name="serviceFeePerTicket"
                    step="0.01"
                    placeholder="8.63"
                    className="input"
                    value={listing.serviceFeePerTicket}
                    onChange={(e) => handleListingChange(listingIndex, e)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Delivery method</label>
                  <input
                    name="deliveryMethod"
                    placeholder="Eventim"
                    className="input"
                    value={listing.deliveryMethod}
                    onChange={(e) => handleListingChange(listingIndex, e)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Expiry date/time
                  </label>
                  <input
                    type="datetime-local"
                    name="expiresAt"
                    className="input"
                    value={listing.expiresAt}
                    onChange={(e) => handleListingChange(listingIndex, e)}
                  />
                </div>

                <label className="flex items-center gap-2 col-span-2 text-sm">
                  <input
                    type="checkbox"
                    name="isPurchasable"
                    checked={listing.isPurchasable}
                    onChange={(e) => handleListingChange(listingIndex, e)}
                  />
                  Can be purchased
                </label>
              </div>

              {/* Variants */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Variants (Seats) — {listing.items.length}/4
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addVariant(listingIndex)}
                    disabled={listing.items.length >= 4}
                  >
                    + Add Variant
                  </Button>
                </div>

                {listing.items.map((it, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-3 rounded-md border grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="text-sm font-medium">Row</label>
                      <input
                        name="row"
                        placeholder="E"
                        className="input"
                        value={it.row}
                        onChange={(e) =>
                          handleItemChange(listingIndex, itemIndex, e)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Seat number</label>
                      <input
                        name="seatNumber"
                        placeholder="25"
                        className="input"
                        value={it.seatNumber}
                        onChange={(e) =>
                          handleItemChange(listingIndex, itemIndex, e)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Seat price (£)
                      </label>
                      <input
                        type="number"
                        name="basePrice"
                        step="0.01"
                        placeholder="86.25"
                        className="input"
                        value={it.basePrice ?? ""}
                        onChange={(e) =>
                          handleItemChange(listingIndex, itemIndex, e)
                        }
                      />
                    </div>

                

                    {/* <div className="col-span-2">
                      <label className="text-sm font-medium">
                        Variant description (optional)
                      </label>
                      <input
                        name="description"
                        placeholder="Optional"
                        className="input"
                        value={it.description}
                        onChange={(e) =>
                          handleItemChange(listingIndex, itemIndex, e)
                        }
                      />
                    </div> */}

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeVariant(listingIndex, itemIndex)}
                        className="text-red-600 text-sm"
                      >
                        Remove variant
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeListing(listingIndex)}
                  className="text-red-600 text-sm"
                >
                  Remove listing
                </button>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addListing}>
            + Add Another Listing
          </Button>
        </section>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-fns-primary h-12 cursor-pointer text-white py-3 rounded-lg"
        >
          {loading ? "Creating Event..." : "Create Event"}
        </Button>
      </form>

      <style>{`
        .input {
          width: 100%;
          padding: 0.65rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
