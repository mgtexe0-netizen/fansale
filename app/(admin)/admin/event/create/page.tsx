/** @format */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface Listing {
  ticketType: string;
  row: string;
  seatNumbers: string;
  description: string
  deliveryMethod: string;
  originalPricePerTicket: number | null;
  serviceFeePerTicket: number | null;
  isPurchasable: boolean;
  expiresAt: string;
}

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

  const [listings, setListings] = useState<Listing[]>([
    {
      ticketType: "",
      row: "",
      seatNumbers: "",
      description: "",
      deliveryMethod: "Eventim",
      originalPricePerTicket: null,
      serviceFeePerTicket: null,
      isPurchasable: true,
      expiresAt: "",
    },
  ]);

  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleListingChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const updated = [...listings];

    let nextValue: any = value;

    if (type === "number") {
      if (value === "") {
        if (
          name === "serviceFeePerTicket" ||
          name === "originalPricePerTicket"
        ) {
          nextValue = null;
        } else {
          nextValue = 0;
        }
      } else {
        nextValue = Number(value);
      }
    } else if (type === "checkbox") {
      nextValue = (e.target as HTMLInputElement).checked;
    }

    updated[index] = {
      ...updated[index],
      [name]: nextValue,
    };

    setListings(updated);
  };

  const addListing = () => {
    setListings([
      ...listings,
      {
        ticketType: "",
        row: "",
        description: "",
        seatNumbers: "",
        deliveryMethod: "Eventim",
        originalPricePerTicket: null,
        serviceFeePerTicket: null,
        isPurchasable: true,
        expiresAt: "",
      },
    ]);
  };

  const removeListing = (index: number) => {
    if (listings.length === 1) return;
    setListings(listings.filter((_, i) => i !== index));
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
      const payload = {
        ...eventData,
        listings,
      };
      const res = await axios.post("/api/admin/event", payload); // ✅ Sends payload directly

      // console.log(res.data);
      toast.success("Successfully created");
      // router.push(`/tickets/all/${res.data.event.slug}`);
    } catch (error: any) {
const msg =
  error?.response?.data?.message || error?.message || "Something went wrong";

toast.error(String(msg));    } finally {
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
          <h2 className="text-xl font-semibold">Ticket Listings</h2>

          {listings.map((listing, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg grid grid-cols-2 gap-4"
            >
              <div>
                <label htmlFor="">Ticket type</label>
                <input
                  name="ticketType"
                  placeholder="Full Price Ticket "
                  className="input col-span-2"
                  value={listing.ticketType}
                  onChange={(e) => handleListingChange(index, e)}
                />
              </div>

              <div>
                <label htmlFor="">Row</label>

                <input
                  name="row"
                  placeholder="Row (e.g. E)"
                  className="input"
                  value={listing.row}
                  onChange={(e) => handleListingChange(index, e)}
                />
              </div>
              <input
                name="seatNumbers"
                placeholder="Seat numbers (e.g. 32)"
                className="input col-span-1"
                value={listing.seatNumbers}
                onChange={(e) => handleListingChange(index, e)}
              />

              <input
                type="number"
                name="originalPricePerTicket"
                step="0.01"
                placeholder="Original price per ticket (£ 86.25)"
                className="input"
                value={listing.originalPricePerTicket ?? ""}
                onChange={(e) => handleListingChange(index, e)}
              />

              <input
                type="number"
                name="serviceFeePerTicket"
                step="0.01"
                placeholder="Service fee (£ 8.63)"
                className="input"
                value={listing.serviceFeePerTicket ?? ""}
                onChange={(e) => handleListingChange(index, e)}
              />

              <input
                name="deliveryMethod"
                placeholder="Delivery method (e.g. Eventim)"
                className="input"
                value={listing.deliveryMethod}
                onChange={(e) => handleListingChange(index, e)}
              />

              <div>
                <label htmlFor="Description"></label>
                <textarea
                  name="description"
                  placeholder="Ticket Description"
                  className="input"
                  value={listing.description}
                  onChange={(e) => handleListingChange(index, e)}
                />
              </div>

              <input
                type="datetime-local"
                name="expiresAt"
                placeholder="Expiry date/time"
                className="input"
                value={listing.expiresAt}
                onChange={(e) => handleListingChange(index, e)}
              />

              <label className="flex items-center gap-2 col-span-2 text-sm">
                <input
                  type="checkbox"
                  name="isPurchasable"
                  checked={listing.isPurchasable}
                  onChange={(e) => handleListingChange(index, e)}
                />
                Can be purchased
              </label>

              <button
                type="button"
                onClick={() => removeListing(index)}
                className="text-red-600 col-span-2 text-right text-sm"
              >
                Remove listing
              </button>
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
