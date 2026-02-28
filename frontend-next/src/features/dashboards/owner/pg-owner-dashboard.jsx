"use client";
import React, { useState } from "react";

import { SideBar } from "./view/side-bar";
import { Overview } from "./view/overview";
import RoomStructurePage from "./view/room-layout";
import TicketManagementSection from "./view/tickets";
import { TenantCallRequests } from "./view/call-requests";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-slate-900">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && <Overview />}
      {activeTab === "tenants" && <RoomStructurePage />}
      {activeTab === "tickets" && <TicketManagementSection />}
      {activeTab === "call-requests" && <TenantCallRequests />}
    </div>
  );
};

export default OwnerDashboard;
