"use client";
import React, { useState, useContext, useEffect } from 'react';

import {
  Wrench, Zap, Droplets, ShieldAlert,
  Image as ImageIcon, Send, Clock, AlertTriangle,
  X, CheckCircle2
} from 'lucide-react';
import Mycontext from "../../../../context/mycontext";

const RaiseTicketSection = () => {
  const { loggedUser } = useContext(Mycontext);
  const [category, setCategory] = useState('plumbing');
  const [priority, setPriority] = useState('medium');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStay, setCurrentStay] = useState(null);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/dashboard/tenant`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentStay(data.currentStay);
        }
      } catch (error) {
        console.error('Failed to fetch stay for ticket:', error);
      }
    };
    fetchStay();
  }, []);

  const categories = [
    { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: 'text-blue-500' },
    { id: 'electrical', label: 'Electrical', icon: Zap, color: 'text-yellow-500' },
    { id: 'appliance', label: 'Appliance', icon: Wrench, color: 'text-orange-500' },
    { id: 'security', label: 'Security', icon: ShieldAlert, color: 'text-rose-500' },
  ];

  const handleSubmit = async () => {
    if (!currentStay) {
      alert("No active stay found. You can only raise tickets for an active PG stay.");
      return;
    }
    if (!issue || !description) {
      alert("Please fill in both the issue summary and description.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/tickets`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pgId: currentStay.pg_id,
          issue: issue,
          description: description,
          category: category,
          priority: priority.charAt(0).toUpperCase() + priority.slice(1)
        })
      });

      if (!response.ok) throw new Error('Failed to create ticket');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit ticket:', error);
      alert('Failed to submit ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-emerald-100 w-full mx-auto">
        <div className="size-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Ticket Raised Successfully!</h2>
        <p className="text-slate-500 mt-2">Your ticket has been recorded. Our maintenance team will respond shortly.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition"
        >
          Raise Another Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

        <div className="p-8 lg:p-12 space-y-10">

          <section className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Select Issue Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${category === cat.id
                    ? 'border-orange-500 bg-orange-50/50 shadow-lg shadow-orange-100'
                    : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                    }`}
                >
                  <cat.icon size={24} className={category === cat.id ? 'text-orange-600' : 'text-slate-400'} />
                  <span className={`text-xs font-black uppercase tracking-widest ${category === cat.id ? 'text-orange-700' : 'text-slate-500'}`}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Urgency Level</label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p.toLowerCase())}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${priority === p.toLowerCase()
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Issue Summary</label>
                <input
                  type="text"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-4 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-medium text-black placeholder-black"
                  placeholder="e.g. AC not cooling"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-4 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-medium resize-none text-black placeholder-black"
                  placeholder="Tell us exactly what's wrong..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                <h4 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} /> Raising for:
                </h4>
                <p className="text-sm text-orange-700 font-medium">
                  {currentStay ? `${currentStay.pg_name}` : 'Scanning for active stay...'}
                </p>
                {!currentStay && !loading && (
                  <p className="text-xs text-red-500 mt-2 font-bold">You must have an active confirmed booking to raise a maintenance ticket.</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Photo Reference (Coming Soon)</label>
                <div className="h-[180px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center bg-slate-50/50">
                  <ImageIcon size={32} className="text-slate-200" />
                  <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Image upload disabled</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
            <div className="flex items-center gap-3 text-slate-400 font-medium text-xs">
              <Clock size={16} />
              Estimated resolution: <span className="text-slate-900 font-bold">24-48 Hours</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !currentStay}
              className={`w-full md:w-auto px-10 py-4 ${loading || !currentStay ? 'bg-slate-300 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'} text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-100`}
            >
              {loading ? 'Submitting...' : 'Submit Ticket'} <Send size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RaiseTicketSection;