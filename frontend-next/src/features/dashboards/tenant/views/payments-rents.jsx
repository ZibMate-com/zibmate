"use client";
import { useState, useEffect } from "react";

import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  IndianRupee,
} from "lucide-react";

const PaymentsRentSection = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ totalPaid: 0, pendingCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch payments");
        const bookings = await response.json();
        setPayments(bookings);

        // Calculate stats
        const total = bookings
          .filter((b) => b.status === "confirmed")
          .reduce((sum, b) => sum + Number(b.total_amount), 0);
        const pending = bookings.filter((b) => b.status === "pending").length;
        setStats({ totalPaid: total, pendingCount: pending });
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Ledger...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Financial Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Paid</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">₹{stats.totalPaid.toLocaleString()}</span>
            {/* <span className="text-emerald-400 text-xs font-bold">↑ 8.2%</span> */}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[100%]" />
            </div>
            <span className="text-[10px] font-bold text-slate-400"> Lifetime</span>
          </div>
          <CreditCard className="absolute -bottom-4 -right-4 size-32 opacity-5 -rotate-12" />
        </div>

        <StatCardMini
          label="Pending Requests"
          value={stats.pendingCount}
          sub="Awaiting Confirmation"
          isAlert={stats.pendingCount > 0}
        />
        <StatCardMini label="Security Deposits" value="₹0" sub="Held in Escrow" />
      </div>

      {/* 2. Main Ledger & Management */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Rent <span className="text-orange-600">Ledger</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium">Tracking all your bookings</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Property / Room</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {payments.length > 0 ? (
                payments.map((pay) => (
                  <PaymentRow
                    key={pay.id}
                    name={pay.pg_name}
                    room={pay.room_number || "N/A"}
                    amount={pay.total_amount}
                    date={new Date(pay.created_at).toLocaleDateString()}
                    status={pay.status} // 'pending', 'confirmed' (mapped to paid?)
                    // method="UPI"
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-5 text-center text-slate-400">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatCardMini = ({ label, value, sub, isAlert }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h2 className={`text-3xl font-black ${isAlert ? "text-rose-500" : "text-slate-900"}`}>{value}</h2>
    <p className="text-xs font-bold text-slate-400 mt-2">{sub}</p>
  </div>
);

const PaymentRow = ({ name, room, amount, date, status, method, days }) => (
  <tr className="hover:bg-slate-50/80 transition-all group">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
          {room}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">{name}</p>
          <p className="text-[10px] text-slate-400 font-black uppercase">Room {room}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5">
      <p className="font-bold text-slate-800 text-sm">₹{amount}</p>
      {method && <p className="text-[10px] text-emerald-500 font-bold uppercase">{method}</p>}
    </td>
    <td className="px-8 py-5">
      <p className="text-xs font-bold text-slate-600">{date}</p>
      {days && <p className="text-[10px] text-rose-500 font-bold uppercase">{days} late</p>}
    </td>
    <td className="px-8 py-5">
      <div className="flex items-center">
        {status === "paid" && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
            <CheckCircle2 size={12} /> Paid
          </span>
        )}
        {status === "overdue" && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase">
            <AlertCircle size={12} /> Overdue
          </span>
        )}
        {status === "pending" && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase">
            <Clock size={12} /> Pending
          </span>
        )}
      </div>
    </td>
    <td className="px-8 py-5 text-right">
      {status !== "paid" ? (
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md">
          Remind
        </button>
      ) : (
        <button className="p-2 text-slate-400 hover:text-slate-900">
          <MoreHorizontal size={20} />
        </button>
      )}
    </td>
  </tr>
);

export default PaymentsRentSection;
