import { MoreVertical } from "lucide-react"

export const TenantRow = ({ name, room, status, agreement, expiry, isWarning }) => {
    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                        {room}
                    </div>
                    <div>
                        <p className="font-bold text-sm text-slate-800">{name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Room {room}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>{status}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className={`text-xs font-bold ${isWarning ? 'text-orange-600' : 'text-slate-700'}`}>{agreement}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">{expiry}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                    <MoreVertical size={16} />
                </button>
            </td>
        </tr>
    )
}