import { NavItem } from "../components/nav-items";
import {
  Home,
  FileText,
  CreditCard,
  CalendarCheck,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Download,
  User,
  LogOut,
  Receipt,
  Clock,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Wrench,
  LetterText,
} from "lucide-react";
export const SideBar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="hidden lg:flex w-max bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
      <div className="p-8">
        <nav className="space-y-2">
          <NavItem id="overview" label="Dashboard" icon={Home} active={activeTab} onClick={setActiveTab} />
          <NavItem id="payments" label="Payments & Rent" icon={CreditCard} active={activeTab} onClick={setActiveTab} />
          <NavItem id="docs" label="Documents" icon={FileText} active={activeTab} onClick={setActiveTab} />
          <NavItem id="maintenance" label="Maintenance" icon={Wrench} active={activeTab} onClick={setActiveTab} />
          <NavItem
            id="noticePeriod"
            label="Notice-Period"
            icon={LetterText}
            active={activeTab}
            onClick={setActiveTab}
          />
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-gray-100">
        <button className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-semibold text-sm">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};
