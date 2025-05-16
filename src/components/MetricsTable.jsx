import React from "react";

export default function MetricsTable({ data, onEdit, onDelete, sortOrder, onSortChange }) {
  return (
    <table className="min-w-full table-auto border-collapse text-sm md:text-base">
      <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
        <tr>
          <th className="p-3 text-left">Metric</th>
          <th
            className="p-3 text-left cursor-pointer select-none"
            onClick={onSortChange}
            aria-sort={sortOrder === "asc" ? "ascending" : "descending"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSortChange();
            }}
          >
            Value {sortOrder === "asc" ? "▲" : "▼"}
          </th>
          <th className="p-3 text-left hidden md:table-cell">Timestamp</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="4" className="p-4 text-center italic text-gray-500 dark:text-gray-400">
              No metrics to display.
            </td>
          </tr>
        ) : (
          data.map(({ id, metric, value, timestamp }) => (
            <tr
              key={id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="p-3 capitalize">{metric}</td>
              <td className="p-3">{value}</td>
              <td className="p-3 hidden md:table-cell">{new Date(timestamp).toLocaleString()}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => onEdit(id)}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  aria-label={`Edit metric entry with value ${value} for ${metric}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this metric entry?")) onDelete(id);
                  }}
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  aria-label={`Delete metric entry with value ${value} for ${metric}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
