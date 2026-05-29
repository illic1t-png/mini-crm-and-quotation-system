import { useState } from "react";
import CloseIcon from "../../assets/close.png"
import { discountAmount, grandTotal, itemTotal, subTotal } from "../../services/quotation";

const defaultItem = { productName: "", quantity: 1, unitPrice: 0 };
const defaultValues = {
  client: "",
  status: "Draft",
  items: [{ ...defaultItem }],
  discount: 0,
  tax: 12,
};

export default function QuotationForm({ initialValues = defaultValues, onSubmit, clients = [] }) {
  const [form, setForm] = useState(initialValues);

  const handleItemChange = (idx, field, value) => {
    const items = form.items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setForm((f) => ({ ...f, items }));
  };

  const handleAddItem = () => {
    setForm((f) => ({ ...f, items: [...f.items, { ...defaultItem }] }));
  };

  const handleRemoveItem = (idx) => {
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  const subtotal = subTotal(form.items);
  const discount = discountAmount(form.items, form.discount);
  const total = grandTotal(form.items, form.tax, form.discount);
  const taxAmount = total - (subtotal - discount);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1 text-sm text-gray-600 w-full">
          <span>Lead / Client</span>
          <select
            name="client"
            value={form.client}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select existing lead/client</option>
            {clients.map((client) => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm text-gray-600 w-full">
          <span>Status</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
      </div>

      <div>
        <div className="font-semibold mb-2">Line Items</div>
        <table className="w-full text-sm mb-2 border-separate border-spacing-4">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="text-left">PRODUCT</th>
              <th className="text-center">QTY</th>
              <th className="text-center">UNIT PRICE</th>
              <th className="text-right">TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    value={item.productName}
                    onChange={(e) => handleItemChange(idx, "productName", e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Product name"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                    className="border rounded px-2 py-1 w-16 text-center"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                    className="border rounded px-2 py-1 w-24 text-center"
                  />
                </td>
                <td className="text-right font-mono">
                  ₱{itemTotal(item).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td>
                  {form.items.length > 1 && (
                    <img src={CloseIcon} alt="Remove" className="ml-6 w-4 h-4 cursor-pointer" onClick={() => handleRemoveItem(idx)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button type="button" onClick={handleAddItem} className="text-white font-semibold border rounded bg-accent p-2">Add item</button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <label className="block text-sm text-gray-600">
            <span>Discount (%)</span>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="0"
            />
          </label>
          <label className="block text-sm text-gray-600">
            <span>Tax (%)</span>
            <input
              type="number"
              name="tax"
              value={form.tax}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="0"
              max="100"
            />
          </label>
        </div>
        <div className="space-y-1 text-sm text-gray-600 mt-4 md:mt-0">
          <div className="flex justify-between"><span>Subtotal</span><span>₱{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>-₱{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between"><span>Tax ({form.tax}%)</span><span>+₱{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between font-bold text-lg mt-2"><span>Grand Total</span><span className="text-green-600">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        </div>
      </div>

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
          Save quotation
        </button>
      </div>
    </form>
  );
}
