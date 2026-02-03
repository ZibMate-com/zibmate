export const FilterTab = ({ active, label, count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
        active ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      {label}{" "}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-md ${active ? "bg-orange-100 text-orange-600" : "bg-slate-200"}`}
      >
        {count}
      </span>
    </button>
  );
};
