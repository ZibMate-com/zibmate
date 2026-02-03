export const MobileNavItem = ({ icon: Icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg ${active ? "text-orange-500 bg-orange-50" : "text-slate-400"}`}
    >
      <Icon size={24} />
    </button>
  );
};
