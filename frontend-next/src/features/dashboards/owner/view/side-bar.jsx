import { SideBarLink } from "../components/sidebarlink";
import {
  Users,
  Home,
  Receipt,
  Wrench,
  Search,
  Plus,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  TrendingUp,
  MoreVertical,
  Filter,
  ArrowUpRight,
} from "lucide-react";
export const SideBar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <nav className="space-y-1">
          <SideBarLink
            icon={TrendingUp}
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <SideBarLink
            icon={Users}
            label="Tenants"
            active={activeTab === "tenants"}
            onClick={() => setActiveTab("tenants")}
          />
          <SideBarLink
            icon={Wrench}
            label="Tickets"
            active={activeTab === "tickets"}
            onClick={() => setActiveTab("tickets")}
          />
          <SideBarLink
            icon={FileText}
            label="Agreements"
            active={activeTab === "agreements"}
            onClick={() => setActiveTab("agreements")}
          />
        </nav>
      </div>
    </aside>
  );
};
