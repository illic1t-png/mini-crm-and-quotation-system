export default function DataTable({
  columns = [],
  rows = [],
  rowKey = (row) => row.id ?? JSON.stringify(row),
  emptyMessage = "No records found",
  className = "",
  onRowClick,
  rowClassName = "",
}) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`.trim()}>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 font-semibold ${column.headerClassName || ""}`.trim()}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className={`border-t border-gray-100 hover:bg-gray-50/80 transition-colors ${rowClassName}`.trim()}
              onClick={() => onRowClick?.(row)}
              style={onRowClick ? { cursor: "pointer" } : undefined}
            >
              {columns.map((column) => (
                <td key={`${rowKey(row)}-${column.key}`} className={`px-4 py-3 align-top ${column.cellClassName || ""}`.trim()}>
                  {column.render ? column.render(row) : row[column.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
