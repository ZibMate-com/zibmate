export const StatCard = ({ label, value, sub, isAlert }) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h2 className={`text-2xl font-black mt-1 ${isAlert && value.includes("₹") ? "text-red-500" : "text-slate-900"}`}>
        {value}
      </h2>
      <p className="text-xs font-bold text-slate-400 mt-2">{sub}</p>
    </div>
  );
};
