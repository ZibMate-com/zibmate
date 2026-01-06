import React, { useState } from 'react';
import { 
  CreditCard, ArrowUpRight, ArrowDownRight, 
  Download, Bell, Search, Filter, CheckCircle2, 
  Clock, AlertCircle, MoreHorizontal, IndianRupee
} from 'lucide-react';

const PaymentsRentSection = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* 1. Financial Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Collected (Jan)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">₹2,42,000</span>
            <span className="text-emerald-400 text-xs font-bold">↑ 8.2%</span>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[85%]" />
            </div>
            <span className="text-[10px] font-bold text-slate-400">85% of target</span>
          </div>
          <CreditCard className="absolute -bottom-4 -right-4 size-32 opacity-5 -rotate-12" />
        </div>

        <StatCardMini label="Pending Dues" value="₹42,500" sub="7 Tenants remaining" isAlert />
        <StatCardMini label="Security Deposits" value="₹8,10,000" sub="Held in Escrow" />
      </div>

      {/* 2. Main Ledger & Management */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rent <span className="text-orange-600">Ledger</span></h2>
            <p className="text-slate-400 text-sm font-medium">Tracking payments for January 2026</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search tenant or room..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-orange-500/20 outline-none" />
            </div>
            <button className="p-2.5 bg-slate-50 rounded-xl text-slate-500 hover:bg-slate-100"><Filter size={20}/></button>
            <button className="p-2.5 bg-orange-50 rounded-xl text-orange-600 hover:bg-orange-100"><Download size={20}/></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Tenant / Room</th>
                <th className="px-8 py-5">Monthly Rent</th>
                <th className="px-8 py-5">Due Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <PaymentRow 
                name="Arjun Mehra" room="402" amount="14,500" 
                date="05 Jan" status="paid" method="UPI"
              />
              <PaymentRow 
                name="Sneha Kapoor" room="105" amount="12,000" 
                date="05 Jan" status="overdue" days="2 days"
              />
              <PaymentRow 
                name="Rahul Varma" room="301" amount="14,500" 
                date="07 Jan" status="pending" 
              />
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50/30 flex justify-between items-center">
            <p className="text-xs text-slate-400 font-medium italic">Showing 1-10 of 24 tenants</p>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">Previous</button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatCardMini = ({ label, value, sub, isAlert }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h2 className={`text-3xl font-black ${isAlert ? 'text-rose-500' : 'text-slate-900'}`}>{value}</h2>
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
        {status === 'paid' && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
            <CheckCircle2 size={12} /> Paid
          </span>
        )}
        {status === 'overdue' && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase">
            <AlertCircle size={12} /> Overdue
          </span>
        )}
        {status === 'pending' && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase">
            <Clock size={12} /> Pending
          </span>
        )}
      </div>
    </td>
    <td className="px-8 py-5 text-right">
      {status !== 'paid' ? (
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