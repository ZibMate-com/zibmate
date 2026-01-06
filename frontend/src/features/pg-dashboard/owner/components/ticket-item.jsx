import { ChevronRight } from "lucide-react"

export const TicketItem = ({ room, issue, time, priority }) => {
    return (
        <div className="flex items-start justify-between p-4 bg-slate-50 rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer group">
            <div className="flex gap-3">
                <div className={`mt-1 size-2 rounded-full ${priority === 'High' ? 'bg-red-500 animate-pulse' : priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-orange-700">{issue}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Room {room} • {time}</p>
                </div>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-orange-400" />
        </div>
    )
}