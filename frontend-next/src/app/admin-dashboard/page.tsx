"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Search,
  Filter,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowUpRight,
  User,
  Building,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface RequestProps {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  property_name?: string;
  city?: string;
  state?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"tenant" | "owner">("tenant");
  const [tenantRequests, setTenantRequests] = useState<RequestProps[]>([]);
  const [ownerRequests, setOwnerRequests] = useState<RequestProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Authentication check and data fetching
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Mock user check (replace with real auth hook or context)
        const userStr = localStorage.getItem("users");
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.role !== "admin") {
            // alert('Unauthorized'); // Or redirect
            // router.push('/'); // Or dashboard
          }
        }

        const fetchRequests = async () => {
          try {
            const tenRes = await fetch("/api/requests/tenant", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (tenRes.ok) setTenantRequests(await tenRes.json());

            const ownRes = await fetch("/api/requests/owner", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (ownRes.ok) setOwnerRequests(await ownRes.json());
          } catch (error) {
            console.error("Failed to fetch requests", error);
          }
        };

        await fetchRequests();
        setLoading(false);
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/login");
      }
    };
    checkAuthAndFetch();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  const handleSendDetails = async (requestId: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/requests/sendmail/${requestId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    // Update local state to show status change if any (e.g. inactive)
    setTenantRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "inactive" } : r)));
  };

  const currentRequests = activeTab === "tenant" ? tenantRequests : ownerRequests;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <main className="flex-1 p-8 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              Callback <span className="text-orange-600">Requests</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Currently viewing <span className="text-slate-900 font-bold">{activeTab}</span> inquiries
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-orange-200">
              <Clock size={14} /> {currentRequests.length} Total {activeTab === "tenant" ? "Tenants" : "Owners"}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 active:scale-95"
          >
            Logout <LogOut className="size-4" />
          </button>
        </header>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-200/50 rounded-2xl w-fit mb-8">
          <button
            onClick={() => setActiveTab("tenant")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "tenant" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Tenants
          </button>
          <button
            onClick={() => setActiveTab("owner")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "owner" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Owners
          </button>
        </div>

        {/* requests list */}
        <div className="grid gap-6">
          <AnimatePresence>
            {currentRequests.length > 0 ? (
              currentRequests.map((req, index) => (
                <motion.div
                  key={`${activeTab}-${req.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <RequestCard data={req} type={activeTab} onSendDetails={handleSendDetails} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="text-slate-400 mb-4">
                  <PhoneCall size={64} className="mx-auto opacity-20" />
                </div>
                <p className="text-slate-500 font-medium">No {activeTab} requests yet</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function RequestCard({
  data,
  type,
  onSendDetails,
}: {
  data: RequestProps;
  type: "tenant" | "owner";
  onSendDetails: (id: number) => Promise<void>;
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendEmail = async () => {
    setSending(true);
    try {
      await onSendDetails(data.id);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("Error sending details:", error);
      toast.error("Failed to send details");
    } finally {
      setSending(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = `tel:${data.phone}`;
  };

  return (
    <section
      className={`group rounded-[2.5rem] border border-slate-100 hover:border-orange-200 transition-all hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden bg-white ${data.status === "inactive" ? "opacity-50" : ""}`}
    >
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            <div
              className={`size-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                type === "owner"
                  ? "bg-blue-50 text-blue-500 group-hover:bg-blue-500"
                  : "bg-orange-50 text-orange-500 group-hover:bg-orange-500"
              } group-hover:text-white`}
            >
              <PhoneCall size={28} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">{data.full_name}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    data.status === "inactive" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {data.status || "Active"}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Phone size={16} className="text-slate-400" /> {data.phone}
                </span>
                {data.email && (
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">📧 {data.email}</span>
                )}
                {type === "tenant" && data.property_name && (
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <MapPin size={16} className="text-slate-400" /> {data.property_name}
                  </span>
                )}
                {type === "owner" && (data.city || data.state) && (
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <MapPin size={16} className="text-slate-400" />
                    {data.city}
                    {data.city && data.state ? ", " : ""}
                    {data.state}
                  </span>
                )}
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <Calendar size={16} /> Requested {data.created_at && data.created_at.slice(0, 10)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-col  flex justify-center items-center gap-3 flex-wrap">
            {/* Call Now Button - For Both Tenant and Owner */}
            <button
              onClick={handleCallNow}
              className="flex-1 lg:flex-none border-2 border-orange-500 text-orange-600 font-bold rounded-2xl w-full h-14 px-6 py-3 md:py-0 hover:bg-orange-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Phone size={18} /> Call Now
            </button>

            {/* Send Owner Details Button - Only for Tenants */}
            {type === "tenant" && (
              <button
                onClick={handleSendEmail}
                disabled={sending || data.status === "inactive"}
                className={`flex-1 lg:flex-none font-bold rounded-2xl h-14 px-8 flex items-center gap-2 active:scale-95 w-full py-3 justify-center transition-all shadow-xl shadow-slate-200 ${
                  data.status === "inactive"
                    ? "bg-slate-500 text-white cursor-not-allowed"
                    : sending
                      ? "bg-slate-400 text-white cursor-wait"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                {sent ? (
                  <p>
                    <CheckCircle2 size={18} /> Email Sent!
                  </p>
                ) : sending ? (
                  <>Sending...</>
                ) : (
                  <p className=" flex items-center">
                    Send Owner Details <ArrowUpRight size={18} />
                  </p>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
