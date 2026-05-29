const statusStyles = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-amber-50 text-amber-700",
  Quoted: "bg-emerald-50 text-emerald-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Draft: "bg-slate-100 text-slate-700",
  Sent: "bg-violet-50 text-violet-700",
  Rejected: "bg-rose-50 text-rose-700",
  Closed: "bg-gray-100 text-gray-700",
};

export default function StatusBadge({ status = "New", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[status] || statusStyles.New} ${className}`.trim()}
    >
      {status}
    </span>
  );
}
