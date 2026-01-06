import { FileText ,Download} from "lucide-react"


export const DocLink = ({ label }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition">
            <div className="flex items-center gap-3">
                <FileText size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <Download size={16} className="text-slate-300" />
        </div>
    )
}