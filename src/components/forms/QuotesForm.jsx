import { useState } from "react";

const defaultValues = {
  clientName: "",
  email: "",
  quoteNumber: "Q-1004",
  total: "",
  status: "Draft",
  notes: "",
};

export default function QuotesForm({ initialValues = defaultValues, onSubmit }) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-gray-600">
          <span>Client name</span>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Acme Labs"
          />
        </label>

        <label className="space-y-1 text-sm text-gray-600">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="sales@acme.test"
          />
        </label>

        <label className="space-y-1 text-sm text-gray-600">
          <span>Quote #</span>
          <input
            type="text"
            name="quoteNumber"
            value={form.quoteNumber}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
          />
        </label>

        <label className="space-y-1 text-sm text-gray-600">
          <span>Total</span>
          <input
            type="number"
            name="total"
            value={form.total}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="0"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm text-gray-600">
        <span>Status</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
        >
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>

      <label className="space-y-1 text-sm text-gray-600">
        <span>Notes</span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
          placeholder="Optional notes for the quotation"
        />
      </label>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => setForm(defaultValues)}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90"
        >
          Save quote
        </button>
      </div>
    </form>
  );
}
