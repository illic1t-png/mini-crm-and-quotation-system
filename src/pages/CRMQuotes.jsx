import { useEffect, useMemo, useState } from "react";
import QuotationForm from "../components/forms/QuotationForm";
import QuotationTable from "../components/tables/QuotationTable";
import { useAuth } from "../context/authContext.jsx";
import { getLeads } from "../services/leads";
import { createQuotation, getQuotations } from "../services/quotation";

export default function CRMQuotes() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [quotations, setQuotations] = useState([]);
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadQuotations = async () => {
    setIsLoading(true);
    try {
      const data = await getQuotations();
      setQuotations(data);
    } finally {
      setIsLoading(false);
    }
  };

  const loadClients = async () => {
    const leads = await getLeads();
    const names = leads
      .map((lead) => lead.fullName || lead.client || lead.email || "")
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
    setClients(names);
  };

  useEffect(() => {
    if (!currentUser) {
      setQuotations([]);
      setClients([]);
      return;
    }

    loadQuotations();
    loadClients();
  }, [currentUser]);

  const filteredQuotes = useMemo(() => {
    return quotations.filter((quote) => {
      const matchesSearch =
        (quote.client || "").toLowerCase().includes(query.toLowerCase()) ||
        (quote.status || "").toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === "" || quote.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [query, status, quotations]);

  const handleQuotationSaved = async (form) => {
    await createQuotation(form);
    setShowForm(false);
    await loadQuotations();
  };

  const handleQuotationUpdated = async () => {
    await loadQuotations();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Quotes</h1>
        <p className="text-sm text-gray-500">{quotations.length} total quotations</p>
      </div>

      <div className="flex flex-nowrap items-center justify-between gap-3 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-3 flex-nowrap">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search client..."
            className="min-w-0 flex-auto max-w-xs rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-0 transition focus:border-accent"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="min-w-[12rem] flex-none rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-accent"
          >
            <option value="">All</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90"
        >
          + New Quote
        </button>
      </div>

      <QuotationTable quotations={filteredQuotes} clients={clients} onUpdate={handleQuotationUpdated} isLoading={isLoading} />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create quotation</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <QuotationForm onSubmit={handleQuotationSaved} clients={clients} />
          </div>
        </div>
      )}
    </div>
  );
}
