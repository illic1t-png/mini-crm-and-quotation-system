import { useMemo, useState, useEffect } from "react";
import LeadTable from "../components/tables/LeadsTable";
import LeadsForm from "../components/forms/LeadsForm";
import { useAuth } from "../context/authContext.jsx";
import { getLeads } from "../services/leads";

export default function LeadsPage() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadLeads = async () => {
    setIsLoading(true);
    try {
      if (!currentUser) {
        setLeads([]);
        return;
      }

      const data = await getLeads();
      setLeads(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [currentUser]);

  const handleLeadSaved = async () => {
    setShowForm(false);
    setLeadToEdit(null);
    await loadLeads();
  };

  const handleEditLead = (lead) => {
    setLeadToEdit(lead);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setLeadToEdit(null);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        (lead.fullName || "").toLowerCase().includes(query.toLowerCase()) ||
        (lead.email || "").toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        status === "" || lead.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [query, status, leads]);

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-5">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500">{leads.length} total leads</p>
        </div>

        <div className="flex flex-nowrap items-center justify-between gap-3 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex min-w-0 items-center gap-3 flex-nowrap">
            <input
              type="text"
              placeholder="Search leads..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-auto max-w-xs rounded-xl border border-gray-200 px-4 py-2 text-sm"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="min-w-[12rem] flex-none rounded-xl border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Quoted">Quoted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90"
          >
            + New Lead
          </button>
        </div>
      </div>

      {/* TABLE */}
      <LeadTable
        leads={filteredLeads}
        onDelete={deleteLead}
        onEdit={handleEditLead}
        isLoading={isLoading}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {leadToEdit ? "Edit lead" : "Create lead"}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCloseForm}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <LeadsForm
              leadToEdit={leadToEdit}
              onSaved={handleLeadSaved}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}