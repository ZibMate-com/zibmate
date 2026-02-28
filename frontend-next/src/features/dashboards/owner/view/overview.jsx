"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  Users,
  Home,
  Receipt,
  Wrench,
  Search,
  Plus,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  TrendingUp,
  MoreVertical,
  Filter,
  ArrowUpRight,
} from "lucide-react";
import { StatCard } from "../components/statcard";
import { TicketItem } from "../components/ticket-item";
import { TenantRow } from "../components/tenentRow";
import { AddTenantModal } from "./add-tenet";

export const Overview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeTickets: 0,
    totalPgs: 0,
    callRequests: 0,
  });
  const [tenants, setTenants] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("zibmate_token");
        const headers = { Authorization: `Bearer ${token}` };

        const fetchJson = async (url) => {
          const res = await fetch(url, { headers });
          if (!res.ok) throw new Error(`Failed to fetch ${url}`);
          return res.json();
        };

        const [statsData, bookingsData, ticketsData] = await Promise.all([
          fetchJson(`/api/dashboard/owner`),
          fetchJson(`/api/bookings/owner-bookings`),
          fetchJson(`/api/tickets/owner`),
        ]);

        setStats(statsData);
        // Filtering confirmed bookings as "tenants"
        setTenants(bookingsData.filter((b) => b.status === "confirmed"));
        setTickets(ticketsData.filter((t) => t.status !== "closed"));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);
  const handleAddTenant = async (tenantData) => {
    try {
      // Logic to send data to your backend
      console.log("Onboarding new tenant:", tenantData);

      // Optimistic Update (Optional: add to local state immediately)
      const newTenantRecord = {
        id: Date.now(), // fallback ID
        full_name: tenantData.name,
        pg_name: `Room ${tenantData.roomNo} (Floor ${tenantData.floorNo})`,
        check_in_date: new Date().toISOString(),
        status: "confirmed",
      };

      setTenants([newTenantRecord, ...tenants]);

      // Trigger a toast notification here if you have one!
      toast.success("Tenant added successfully!");
    } catch (error) {
      console.error("Error onboarding tenant:", error);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading Dashboard...</div>;

  return (
    <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <AddTenantModal isOpen={isTenantModalOpen} onClose={() => setIsTenantModalOpen(false)} onAdd={handleAddTenant} />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Property <span className="text-orange-600">Management</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage your PG properties and tenants efficiently</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsTenantModalOpen(true)}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-orange-700 transition shadow-lg shadow-orange-100"
          >
            <Plus size={18} /> Add New Tenant
          </button>
          {/* <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                <Plus size={18} /> Add New Listing
            </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          sub="Current confirmed earnings"
        />
        <StatCard label="Total Bookings" value={stats.totalBookings.toString()} sub="Total stay requests" />
        <StatCard
          label="Call Requests"
          value={stats.callRequests.toString()}
          sub="Potential leads"
          isAlert={stats.callRequests > 0}
        />
        <StatCard
          label="Active Tickets"
          value={stats.activeTickets.toString()}
          sub="Needs attention"
          isAlert={stats.activeTickets > 0}
        />
        <StatCard label="My Properties" value={stats.totalPgs.toString()} sub="Total listings on ZibMate" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tenant & Room Management (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-lg">Active Tenants</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search name..."
                    className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 ring-orange-500/20 outline-none w-48"
                  />
                </div>
                <button className="p-2 bg-slate-50 rounded-xl text-slate-500">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Tenant & Building</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Room Type</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tenants.length > 0 ? (
                    tenants.map((tenant) => (
                      <TenantRow
                        key={tenant.id}
                        name={tenant.full_name}
                        room={tenant.pg_name}
                        status="Paid" // Simplified for now
                        agreement="Confirmed"
                        expiry={new Date(tenant.check_in_date).toLocaleDateString()}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                        No active tenants yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ticket Resolution Section (1/3 Width) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Active Tickets</h3>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-1 rounded-md">
                {tickets.length} OPEN
              </span>
            </div>

            <div className="space-y-4">
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <TicketItem
                    key={ticket.id}
                    room={ticket.pg_name}
                    issue={ticket.issue}
                    time={new Date(ticket.created_at).toLocaleDateString()}
                    priority={ticket.priority}
                  />
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm">No active tickets.</div>
              )}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:border-orange-500 hover:text-orange-500 transition-all">
              View All History
            </button>
          </div>

          {/* Quick Action Card */}
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-1">Generate Monthly Reports</h4>
              <p className="text-slate-400 text-xs mb-4">Your property performance summary is ready.</p>
              <button className="flex items-center gap-2 text-xs font-bold bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition">
                Download PDF <ArrowUpRight size={14} />
              </button>
            </div>
            <Receipt size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
          </div>
        </div>
      </div>
    </main>
  );
};
