import StatCard from "../common/Statcards";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { getLeads } from "../../services/leads";
import { getQuotations, grandTotal } from "../../services/quotation";

export default function Dashboard({ setPage }) {
  const { currentUser } = useAuth();
  const [leadCount, setLeadCount] = useState(0);
  const [quoteCount, setQuoteCount] = useState(0);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (!currentUser) {
          setLeadCount(0);
          setQuoteCount(0);
          setRecentLeads([]);
          setRecentQuotes([]);
          return;
        }

        const [leads, quotations] = await Promise.all([getLeads(), getQuotations()]);
        setLeadCount(leads.length);
        setQuoteCount(quotations.length);
        setRecentLeads(leads.slice(0, 4));
        setRecentQuotes(quotations.slice(0, 4));
      } catch (fetchError) {
        setError(fetchError?.message || "Unable to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [currentUser]);

  const formatDate = (value) => {
    if (!value) return "—";
    if (value.toDate) return value.toDate().toLocaleDateString();
    return new Date(value).toLocaleDateString();
  };

  const renderSkeletonRows = (columns) => {
    return Array.from({ length: 4 }, (_, index) => (
      <tr key={index} className="odd:bg-gray-50">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <td key={colIndex} className="border-b border-gray-100 px-3 py-3">
            <div className="h-3 rounded-full bg-slate-200/80 opacity-80" />
          </td>
        ))}
      </tr>
    ));
  };

  const leadMessage = error ? "Unable to load recent leads." : "No recent leads yet.";
  const quoteMessage = error ? "Unable to load recent quotations." : "No recent quotations yet.";

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <StatCard
          label="Total Leads"
          value={
            isLoading ? (
              <span className="inline-block h-10 w-16 animate-pulse rounded-lg bg-slate-200" />
            ) : (
              leadCount
            )
          }
        />
        <StatCard
          label="Total Quotations"
          value={
            isLoading ? (
              <span className="inline-block h-10 w-16 animate-pulse rounded-lg bg-slate-200" />
            ) : (
              quoteCount
            )
          }
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            </div>
            <button
              type="button"
              onClick={() => setPage?.("leads")}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 px-3 py-2 font-medium">Name</th>
                  <th className="border-b border-gray-200 px-3 py-2 font-medium">Status</th>
                  <th className="border-b border-gray-200 px-3 py-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  renderSkeletonRows(3)
                ) : recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="odd:bg-gray-50">
                      <td className="border-b border-gray-100 px-3 py-3 font-medium text-gray-900">
                        {lead.fullName || lead.email || "Unnamed"}
                      </td>
                      <td className="border-b border-gray-100 px-3 py-3 text-gray-600">{lead.status || "New"}</td>
                      <td className="border-b border-gray-100 px-3 py-3 text-gray-600">{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border-b border-gray-100 px-3 py-4 text-center text-sm text-gray-500">
                      {leadMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Quotations</h2>
            </div>
            <button
              type="button"
              onClick={() => setPage?.("quotes")}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 px-3 py-2 font-medium">Client</th>
                  <th className="border-b border-gray-200 px-3 py-2 font-medium">Amount</th>
                  <th className="border-b border-gray-200 px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  renderSkeletonRows(3)
                ) : recentQuotes.length > 0 ? (
                  recentQuotes.map((quote) => (
                    <tr key={quote.id} className="odd:bg-gray-50">
                      <td className="border-b border-gray-100 px-3 py-3 font-medium text-gray-900">
                        {quote.client || quote.refNumber || quote.reference || quote.id}
                      </td>
                      <td className="border-b border-gray-100 px-3 py-3 text-gray-600">
                        {grandTotal(quote.items || [], quote.tax || 0, quote.discount || 0).toLocaleString(undefined, {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </td>
                      <td className="border-b border-gray-100 px-3 py-3 text-gray-600">{quote.status || "Draft"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border-b border-gray-100 px-3 py-4 text-center text-sm text-gray-500">
                      {quoteMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
