import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../components/layout/Dashboard";
import LeadsPage from "./CRMLeads";
import CRMQuotes from "./CRMQuotes";

export default function CRMDashboard({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "leads":
        return <LeadsPage />;
      case "quotes":
        return <CRMQuotes />;
      default:
        return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-tertiary font-sans">
      <Sidebar page={page} setPage={setPage} onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}