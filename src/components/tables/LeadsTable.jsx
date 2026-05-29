import { useState } from "react";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const LeadsTable = ({ leads = [], onDelete, onEdit }) => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const columns = [
    { key: "fullName", header: "Full Name", cellClassName: "font-medium text-gray-900" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "status",
      header: "Status",
      render: (lead) => <StatusBadge status={lead.status} />,
    },
    {
      key: "createdAt",
      header: "Created",
      render: (lead) => (lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : "—"),
    },
  ];

  const handleDelete = (id) => {
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedLead) return;

    onDelete?.(selectedLead.id);
    setSelectedLead(null);
    setIsDeleteConfirmOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <DataTable
        columns={columns}
        rows={leads}
        emptyMessage="No leads found"
        onRowClick={(lead) => setSelectedLead(lead)}
      />

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Lead details</h2>
                <p className="text-sm text-gray-500">Selected lead information</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Full Name</p>
                <p className="text-base font-semibold text-gray-900">{selectedLead.fullName || "—"}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                <p className="text-base font-semibold text-gray-900">{selectedLead.email || "—"}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
                <p className="text-base font-semibold text-gray-900">{selectedLead.phone || "—"}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Status</p>
                <p className="text-base font-semibold text-gray-900">{selectedLead.status || "New"}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3 md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Address</p>
                <p className="text-base font-semibold text-gray-900">{selectedLead.address || "—"}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-3 md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Created</p>
                <p className="text-base font-semibold text-gray-900">{selectedLead.createdAt?.toDate ? selectedLead.createdAt.toDate().toLocaleString() : "—"}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => onEdit?.(selectedLead)}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(selectedLead.id)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Confirm delete</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete this lead? This action cannot be undone.
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
                    Delete lead
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LeadsTable;
