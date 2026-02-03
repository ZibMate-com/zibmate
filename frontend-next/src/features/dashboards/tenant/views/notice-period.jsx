import { Clock, Send, Info, AlertTriangle, CalendarCheck } from "lucide-react";
export const NoticePeriod = () => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden relative group">
      <Clock className="absolute -right-10 -top-10 size-48 text-stone-50 opacity-50 rotate-12 transition-transform group-hover:rotate-0 duration-1000" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">
              Residency Transition
            </span>
            <h3 className="text-2xl font-light text-stone-900 tracking-tight mt-1">Serve Notice Period</h3>
          </div>
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
            <CalendarCheck size={20} className="text-stone-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-sm text-stone-500 leading-relaxed font-light italic">
              "Planning your next move? To ensure a seamless security deposit settlement and room inspection, we require
              a <span className="text-stone-900 font-bold not-italic">30-day notice period</span> prior to your
              departure."
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                <Info size={16} className="text-orange-500 shrink-0" />
                <p className="text-[11px] text-stone-600 font-medium">
                  Serving notice will lock your move-out date and initiate the concierge inspection process.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                Intended Move-out Date
              </label>
              <input
                type="date"
                className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:border-orange-500 outline-none transition-all text-black placeholder-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                Reason for Relocation (Optional)
              </label>
              <select className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:border-orange-500 outline-none transition-all appearance-none text-black placeholder-black">
                <option>Work Relocation</option>
                <option>Personal Reasons</option>
                <option>Lease Expiry</option>
                <option>Other</option>
              </select>
            </div>

            <button className="w-full group bg-stone-900 text-white p-4 rounded-xl flex items-center justify-center gap-3 hover:bg-black transition-all duration-500 shadow-xl shadow-stone-200 active:scale-[0.98]">
              <span className="text-[11px] font-bold uppercase tracking-widest">Submit Notice</span>
              <Send
                size={14}
                className="text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Transition Policy Note */}
        <div className="mt-8 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
          <AlertTriangle size={12} className="text-amber-600" />
          <span className="text-[9px] font-bold uppercase tracking-tighter text-stone-900">
            Notice once served cannot be retracted without administrative approval.
          </span>
        </div>
      </div>
    </div>
  );
};
