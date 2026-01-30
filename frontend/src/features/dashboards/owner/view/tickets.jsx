import React, { useState ,useEffect} from 'react';
import {
    MessageSquare, Clock, CheckCircle, ChevronRight,
    Filter, Search, AlertCircle, Wrench, User, Phone,
    ArrowUpRight, MoreHorizontal
} from 'lucide-react';

import { FilterTab } from '../components/filterTab';

const TicketManagementSection = () => {
    const [filter, setFilter] = useState('open');
    const [tickets, setTickets] = useState([]);
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');
                const baseUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${baseUrl}/api/tickets/owner`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch tickets');
                const data = await response.json();

                // Transform data
                const mappedTickets = data.map(t => ({
                    id: t.id, // or `TK-${t.id}` if preferred
                    tenant: `${t.first_name} ${t.last_name || ''}`,
                    room: t.room_number || 'N/A',
                    issue: t.issue,
                    priority: t.priority,
                    category: t.category,
                    date: new Date(t.created_at).toLocaleDateString(),
                    status: t.status
                }));
                setTickets(mappedTickets);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Failed to fetch tickets", error);
            }
        };
        fetchTickets();
    }, []);

    // Filter tickets logic needs to be updated to use the tickets state
    const filteredTickets = tickets.filter(t => filter === 'open' ? t.status !== 'closed' && t.status !== 'resolved' : t.status === filter);

    if(loading) return <div className="p-10 text-center">Loading your tickets...</div>

    return (
        <div className="w-full mx-auto p-4 lg:p-0">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">


                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Support <span className="text-orange-600">Tickets</span></h2>
                        <p className="text-slate-400 text-sm font-medium mt-1">Manage and resolve tenant complaints</p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl">
                        <FilterTab active={filter === 'open'} label="Open" count={String(tickets.filter(t => ['open', 'in_progress'].includes(t.status)).length).padStart(2, '0')} onClick={() => setFilter('open')} />
                        <FilterTab active={filter === 'resolved'} label="Resolved" count={String(tickets.filter(t => ['resolved', 'closed'].includes(t.status)).length).padStart(2, '0')} onClick={() => setFilter('resolved')} />
                    </div>
                </div>


                <div className="divide-y divide-slate-50">
                    {filteredTickets.map((ticket) => (
                        <div key={ticket.id} className="group hover:bg-slate-50 transition-all p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">


                            <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:w-32 shrink-0">
                                <div className={`size-3 rounded-full ${ticket.priority === 'High' ? 'bg-rose-500 animate-pulse' :
                                    ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${ticket.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {ticket.priority}
                                </span>
                            </div>


                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-2 py-0.5 rounded">
                                        {ticket.category}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        ID: {ticket.id}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                                    {ticket.issue}
                                </h4>
                                <div className="flex flex-wrap items-center gap-4 text-slate-500">
                                    <div className="flex items-center gap-1.5 text-xs font-medium">
                                        <User size={14} className="text-slate-300" /> {ticket.tenant} (Room {ticket.room})
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium">
                                        <Clock size={14} className="text-slate-300" /> {ticket.date}
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center gap-3 lg:ml-auto">
                                <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-all">
                                    Chat
                                </button>
                                <button className="flex-1 lg:flex-none px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                                    Resolve <CheckCircle size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="p-6 bg-slate-50/50 flex justify-center border-t border-slate-100">
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-orange-600 transition-colors">
                        Load More Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};


export default TicketManagementSection;