export const SideBarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active ? "bg-orange-50 text-orange-600" : "text-slate-500 hover:bg-gray-50"
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );
};
