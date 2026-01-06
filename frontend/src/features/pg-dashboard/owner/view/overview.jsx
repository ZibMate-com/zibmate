import {
  Users, Home, Receipt, Wrench, Search, Plus,
  ChevronRight, AlertCircle, CheckCircle2, FileText,
  TrendingUp, MoreVertical, Filter, ArrowUpRight
} from 'lucide-react';
import { StatCard } from '../components/statcard';
import { TicketItem } from '../components/ticket-item';
import { TenantRow } from '../components/tenentRow';

export const Overview = () => {
  return (
    <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Property <span className="text-orange-600">Management</span></h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage your PG the easy way</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
          <Plus size={18} /> Add New Tenant
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Revenue" value="₹2,84,000" sub="↑ 12% this month" />
        <StatCard label="Occupancy" value="92%" sub="22/24 Rooms Filled" />
        <StatCard label="Active Tickets" value="04" sub="2 High Priority" isAlert />
        <StatCard label="Pending Rent" value="₹14,500" sub="3 Tenants Overdue" isAlert />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Tenant & Room Management (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-lg">Tenant Directory</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Search room or name..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 ring-orange-500/20 outline-none w-48" />
                </div>
                <button className="p-2 bg-slate-50 rounded-xl text-slate-500"><Filter size={16} /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Tenant & Room</th>
                    <th className="px-6 py-4">Rent Status</th>
                    <th className="px-6 py-4">Agreement</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <TenantRow name="Arjun Mehra" room="402" status="Paid" agreement="Valid" expiry="12 Oct 2025" />
                  <TenantRow name="Sneha Kapoor" room="105" status="Pending" agreement="Expiring" expiry="02 Jan 2025" isWarning />
                  <TenantRow name="Rahul Varma" room="301" status="Paid" agreement="Valid" expiry="15 Dec 2025" />
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
              <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-1 rounded-md">4 OPEN</span>
            </div>

            <div className="space-y-4">
              <TicketItem room="402" issue="AC not cooling" time="2h ago" priority="High" />
              <TicketItem room="105" issue="Wifi Connection" time="5h ago" priority="Medium" />
              <TicketItem room="202" issue="Leaking Tap" time="1d ago" priority="Low" />
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:border-orange-500 hover:text-orange-500 transition-all">
              View Resolution History
            </button>
          </div>

          {/* Quick Action Card */}
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-1">Generate Monthly Reports</h4>
              <p className="text-slate-400 text-xs mb-4">December 2025 summary is ready.</p>
              <button className="flex items-center gap-2 text-xs font-bold bg-orange-600 px-4 py-2 rounded-lg">
                Download PDF <ArrowUpRight size={14} />
              </button>
            </div>
            <Receipt size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
          </div>
        </div>

      </div>
    </main>
  )
}