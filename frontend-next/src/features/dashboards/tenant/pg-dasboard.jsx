"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import { MobileNavItem } from "./components/mobile-nav-items";
import { SideBar } from "./views/sidebar";
import { Dashboard } from "./views/dashboard";
import { NoticePeriod } from "./views/notice-period";
import RaiseTicketSection from "./views/ticket";
import PaymentsRentSection from "./views/payments-rents";
import { SavedPgSection } from "./views/saved-pgs";
import { Bookmark } from "lucide-react";

export const PgDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "overview" && <Dashboard activeTab={activeTab} />}
      {activeTab === "saved" && <SavedPgSection />}
      {activeTab === "payments" && <PaymentsRentSection activeTab={activeTab} />}
      {activeTab === "noticePeriod" && <NoticePeriod />}
      {activeTab === "maintenance" && <RaiseTicketSection />}

      {activeTab === ""}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center">
        <MobileNavItem icon={Home} onClick={() => setActiveTab("overview")} active={activeTab === "overview"} />
        <MobileNavItem icon={Bookmark} onClick={() => setActiveTab("saved")} active={activeTab === "saved"} />
        <MobileNavItem icon={CreditCard} onClick={() => setActiveTab("payments")} active={activeTab === "payments"} />
        <MobileNavItem icon={Wrench} onClick={() => setActiveTab("support")} active={activeTab === "support"} />
        <MobileNavItem icon={User} onClick={() => setActiveTab("account")} active={activeTab === "account"} />
      </div>
    </div>
  );
};
