import React, { useState } from 'react';
import { 
  Wrench, Zap, Droplets, ShieldAlert, 
  Image as ImageIcon, Send, Clock, AlertTriangle,
  X, CheckCircle2
} from 'lucide-react';

const RaiseTicketSection = () => {
  const [category, setCategory] = useState('plumbing');
  const [priority, setPriority] = useState('medium');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: 'text-blue-500' },
    { id: 'electrical', label: 'Electrical', icon: Zap, color: 'text-yellow-500' },
    { id: 'appliance', label: 'Appliance', icon: Wrench, color: 'text-orange-500' },
    { id: 'security', label: 'Security', icon: ShieldAlert, color: 'text-rose-500' },
  ];

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-emerald-100 w-full mx-auto">
        <div className="size-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Ticket Raised Successfully!</h2>
        <p className="text-slate-500 mt-2">Reference ID: #TK-8829. Our maintenance team usually responds within 4 hours.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition"
        >
          View Ticket Status
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        {/* <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight">Need Help?</h2>
            <p className="text-slate-400 mt-1 font-medium italic">Describe the issue, and we'll fix it ASAP.</p>
          </div>
          <AlertTriangle size={120} className="absolute -bottom-6 -right-6 opacity-10 rotate-12" />
        </div> */}

        <div className="p-8 lg:p-12 space-y-10">
          
          {/* 1. Category Selection */}
          <section className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Select Issue Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                    category === cat.id 
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
            {/* 2. Form Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Urgency Level</label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p.toLowerCase())}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                        priority === p.toLowerCase()
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Issue Description</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-4 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                  placeholder="Tell us exactly what's wrong (e.g. The tap in room 402 is dripping constantly...)"
                />
              </div>
            </div>

            {/* 3. File Upload Area */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Upload Photo (Optional)</label>
              <div className="h-full max-h-[220px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center group hover:border-orange-400 transition-colors cursor-pointer bg-slate-50/50">
                <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <ImageIcon size={32} className="text-slate-300 group-hover:text-orange-500" />
                </div>
                <p className="text-xs font-bold text-slate-500 mt-4">Drag & drop or <span className="text-orange-600">browse</span></p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
            <div className="flex items-center gap-3 text-slate-400 font-medium text-xs">
              <Clock size={16} />
              Estimated resolution: <span className="text-slate-900 font-bold">24-48 Hours</span>
            </div>
            <button 
              onClick={() => setIsSubmitted(true)}
              className="w-full md:w-auto px-10 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 hover:scale-105 active:scale-95"
            >
              Submit Ticket <Send size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RaiseTicketSection;