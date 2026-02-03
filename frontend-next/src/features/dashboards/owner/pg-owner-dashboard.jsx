"use client";
import React, { useState } from "react";

import { SideBar } from "./view/side-bar";
import { Overview } from "./view/overview";
import RoomStructurePage from "./view/room-layout";
import TicketManagementSection from "./view/tickets";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-slate-900">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && <Overview />}
      {activeTab === "tenants" && <RoomStructurePage />}
      {activeTab === "tickets" && <TicketManagementSection />}
    </div>
  );
};

export default OwnerDashboard;
