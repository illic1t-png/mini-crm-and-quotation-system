import { useState } from "react";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import QuotationForm from "../forms/QuotationForm";
import { grandTotal, editQuotation, deleteQuotation } from "../../services/quotation";

export default function QuotationTable({ quotations = [], clients = [], onUpdate = () => {} }) {
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const columns = [
    { key: "client", header: "Client" },
    { key: "status", header: "Status", render: (quotation) => <StatusBadge status={quotation.status || "Draft"} /> },
    { key: "items", header: "Items", render: (quotation) => (quotation.items || []).length },
    { key: "total", header: "Total", render: (quotation) => grandTotal(quotation.items || [], quotation.tax || 0, quotation.discount || 0).toLocaleString(undefined, { style: "currency", currency: "PHP" }) },
    { key: "createdAt", header: "Created", render: (quotation) => quotation.createdAt?.toDate ? quotation.createdAt.toDate().toLocaleDateString() : "—" },
  ];

  const rows = quotations.map((quotation, index) => ({
    ...quotation,
    id: quotation.id || index,
    total: grandTotal(quotation.items || [], quotation.tax || 0, quotation.discount || 0),
  }));

  const handleEditSubmit = async (form) => {
    try {
      setIsLoading(true);
      await editQuotation(selectedQuotation.id, form);
      setIsEditing(false);
      setSelectedQuotation(null);
      onUpdate();
    } catch (error) {
      console.error("Error updating quotation:", error);
      alert("Failed to update quotation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedQuotation) return;

    try {
      setIsLoading(true);
      await deleteQuotation(selectedQuotation.id);
      setSelectedQuotation(null);
      setIsDeleteConfirmOpen(false);
      onUpdate();
    } catch (error) {
      console.error("Error deleting quotation:", error);
      alert("Failed to delete quotation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No quotations available yet."
        onRowClick={(quotation) => setSelectedQuotation(quotation)}
      />

      {selectedQuotation && !isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Quotation details</h2>
                <p className="text-sm text-gray-500">Selected quotation information</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuotation(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Client</p>
                  <p className="text-base font-semibold text-gray-900">{selectedQuotation.client || "—"}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Status</p>
                  <p className="text-base font-semibold text-gray-900">{selectedQuotation.status || "Draft"}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Items</p>
                  <p className="text-base font-semibold text-gray-900">{(selectedQuotation.items || []).length}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Grand Total</p>
                  <p className="text-base font-semibold text-green-600">{grandTotal(selectedQuotation.items || [], selectedQuotation.tax || 0, selectedQuotation.discount || 0).toLocaleString(undefined, { style: "currency", currency: "PHP" })}</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Line Items</p>
                <ul className="mt-2 space-y-2">
                  {(selectedQuotation.items || []).map((item, index) => (
                    <li key={index} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                      <span>{item.productName || "Unnamed item"}</span>
                      <span className="text-gray-500">{item.quantity || 0} × ₱{Number(item.unitPrice || 0).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Saving..." : "✏️ Edit"}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Deleting..." : "🗑️ Delete"}
                </button>
              </div>
            </div>
          </div>

          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Confirm delete</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete this quotation? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={cancelDelete}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Delete quotation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedQuotation && isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit quotation</h2>
                <p className="text-sm text-gray-500">Update quotation information</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
                className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Close
              </button>
            </div>
            <QuotationForm
              initialValues={selectedQuotation}
              onSubmit={handleEditSubmit}
              clients={clients}
            />
          </div>
        </div>
      )}
    </>
  );
}
