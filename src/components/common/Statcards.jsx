export default function StatCard({ label, value, delta, warn = false }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="text-sm text-black-500 font-sans">{label}</div>

      <div className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </div>

      <div
        className={`mt-1 text-sm ${
          warn
            ? "text-red-500"
            : delta?.includes("-")
            ? "text-red-500"
            : "text-green-600"
        }`}
      >
        {delta}
      </div>
    </div>
  );
}