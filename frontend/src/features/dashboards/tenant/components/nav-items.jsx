export const NavItem = ({ id, label, icon: Icon, active, onClick }) => {

    return (
        <button
            onClick={() => onClick(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${active === id ? 'bg-orange-50 text-orange-600' : 'text-slate-500 hover:bg-gray-50'
                }`}
        >
            <Icon size={20} />
            {label}
        </button>
    )
}