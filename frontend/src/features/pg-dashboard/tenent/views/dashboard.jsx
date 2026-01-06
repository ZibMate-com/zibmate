import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, FileText, CreditCard, CalendarCheck, AlertCircle,
    MapPin, Phone, Mail, Download, User, LogOut, Receipt,
    Clock, ShieldCheck, ChevronRight, PlusCircle, Wrench
} from 'lucide-react';
import { payments } from '../models/pg-dashboard';
import { DocLink } from '../components/doc-links';
export const Dashboard = ({activeTab}) => {
    return (
        <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Hello, Arjun 👋</h1>
                    <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPin size={16} className="text-orange-500" /> Sector 45, Gurugram • Room 402
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-gray-50 transition">
                        Help Center
                    </button>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition">
                        Account Settings
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Current Due</p>
                                <h2 className="text-3xl font-bold text-slate-900 mt-1">₹0.00</h2>
                                <div className="mt-4 flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit text-xs font-bold">
                                    <ShieldCheck size={14} /> All clear
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Next Rent Date</p>
                                <h2 className="text-3xl font-bold text-slate-900 mt-1">Jan 01</h2>
                                <p className="text-slate-400 text-sm mt-4 italic">6 days remaining</p>
                            </div>

                            <div className="bg-orange-500 p-6 rounded-2xl shadow-xl shadow-orange-100 text-white relative overflow-hidden">
                                <p className="text-sm font-semibold opacity-80 uppercase tracking-wider">Quick Action</p>
                                <h2 className="text-2xl font-bold mt-1">Raise a Request</h2>
                                <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-orange-50 transition">
                                    <PlusCircle size={16} /> New Ticket
                                </button>
                                <Wrench size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg">Recent Transactions</h3>
                                    <button className="text-orange-600 text-sm font-bold hover:underline">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                                            <tr>
                                                <th className="px-6 py-4">Month</th>
                                                <th className="px-6 py-4">Amount</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {payments.map((p, i) => (
                                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-semibold">{p.month}</td>
                                                    <td className="px-6 py-4 text-slate-600">{p.amount}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold">PAID</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-slate-400 hover:text-slate-900"><Download size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="space-y-6">

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold mb-4">Property Manager</h3>
                                    <div className="flex items-center gap-4">
                                        <img src="https://ui-avatars.com/api/?name=Vikram+M&background=f97316&color=fff" className="w-12 h-12 rounded-full" alt="Avatar" />
                                        <div>
                                            <p className="font-bold text-slate-800">Vikram Malhotra</p>
                                            <p className="text-xs text-slate-400">Available 10AM - 7PM</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-6">
                                        <button className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-lg text-sm font-bold hover:bg-gray-100 transition">
                                            <Phone size={14} /> Call
                                        </button>
                                        <button className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-lg text-sm font-bold hover:bg-gray-100 transition">
                                            <Mail size={14} /> Email
                                        </button>
                                    </div>
                                </div>


                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold mb-4">Your Documents</h3>
                                    <div className="space-y-3">
                                        <DocLink label="Rental Agreement" />
                                        <DocLink label="Police Verification" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}