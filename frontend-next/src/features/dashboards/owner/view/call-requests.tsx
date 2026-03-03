"use client";
import { useState, useEffect } from "react";
import { User, Phone, Clock } from "lucide-react";
import toast from "react-hot-toast";

export const TenantCallRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("zibmate_token");
      const response = await fetch(`/api/requests/tenant`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch call requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading call requests...</div>;

  if (requests.length === 0) return <div className="p-10 text-center text-slate-400">No call requests yet.</div>;

  return (
    <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          Call <span className="text-orange-600">Requests</span>
        </h2>
        <p className="text-slate-400 text-sm font-medium mt-1">Tenant inquiries for your properties</p>
      </div>

      <div className="flex flex-col gap-6 mt-5">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <div className="size-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <User size={28} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{req.full_name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                      Interested in <span className="text-orange-600 font-bold">"{req.pg_name}"</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${req.phone}`}
                      className="h-12 px-6 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-slate-100 hover:bg-slate-800 transition"
                    >
                      <Phone className="size-4" />
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-orange-500" />
                    Sent on{" "}
                    {new Date(req.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">📧 {req.email}</span>
                  <span className="flex items-center gap-1.5 uppercase font-black text-orange-500">
                    Status: {req.status || "PENDING"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
