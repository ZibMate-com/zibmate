"use client";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export const ListedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPgs = async () => {
      try {
        const token = localStorage.getItem("zibmate_token");
        // Use relative path for Next.js internal API or env var
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        // However, since we are in Next.js app, we can call our own API routes directly if they are on same domain
        // But the code likely expects the full URL if it was separate backend.
        // In frontend-next, /api is part of the app.
        // If we use `/api/pg/my-pgs`, it hits the Next.js API route.

        const response = await fetch(`/api/pg/my-pgs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch my properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPgs();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading your properties...</div>;

  if (properties.length === 0) return <div className="p-10 text-center text-slate-400">No properties listed yet.</div>;

  return (
    <div className="flex flex-col gap-10 mt-5">
      {properties.map((prop) => {
        return (
          <div
            key={prop.id}
            className="flex gap-4 text-lg border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="w-1/3 h-48">
              <img
                src={prop.images?.[0] || "/assets/pgimage1.png"}
                className="w-full h-full object-cover rounded-3xl"
                alt=""
              />
            </div>
            <div className="flex justify-between p-6 w-full">
              <div className="flex flex-col text-gray-700 gap-1">
                <span className="text-xs text-slate-400">ID: {prop.id}</span>
                <span className="font-bold text-xl text-slate-900">{prop.name}</span>
                <span className="text-sm line-clamp-2 italic text-slate-500">"{prop.description}"</span>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {prop.Occupancy &&
                      (Array.isArray(prop.Occupancy) ? prop.Occupancy : JSON.parse(prop.Occupancy || "[]")).map(
                        (o: any, i: number) => (
                          <span key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">
                            {o}
                          </span>
                        ),
                      )}
                  </div>
                  <span className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-orange-500" />
                    {prop.city}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {prop.facilities &&
                    (Array.isArray(prop.facilities) ? prop.facilities : JSON.parse(prop.facilities || "[]")).map(
                      (f: any, i: number) => (
                        <span key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">
                          {f}
                        </span>
                      ),
                    )}
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <span className="text-sm text-gray-400">
                  Posted on: {new Date(prop.created_at).toLocaleDateString()}
                </span>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">₹{prop.price}</span>
                    <span className="text-xs text-slate-400">/mo</span>
                  </div>
                  {prop.discount > 0 && (
                    <span className="text-[10px] text-green-600 bg-green-50 border border-green-100 px-2 py-1 rounded-md font-bold">
                      OFF ₹{prop.discount}
                    </span>
                  )}
                </div>

                <button
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    prop.status === "active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : prop.status === "inactive"
                        ? "bg-rose-50 text-rose-600 border-rose-100"
                        : "bg-orange-50 text-orange-600 border-orange-100"
                  }`}
                >
                  {prop.status ? prop.status.toUpperCase() : "UNKNOWN"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
