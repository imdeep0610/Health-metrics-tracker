import React from "react";

const timeOfDayOptions = [
  { value: "all", label: "All" },
  { value: "morning", label: "Morning (6 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 6 PM)" },
  { value: "evening", label: "Evening (6 PM - 9 PM)" },
  { value: "night", label: "Night (9 PM - 6 AM)" },
];

export default function FilterSortControls({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  metricOptions,
  selectedMetric,
  onMetricChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex gap-2 items-center">
        <label htmlFor="filter" className="font-medium">
          Filter by Time of Day:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeOfDayOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <label htmlFor="metric" className="font-medium">
          Metric:
        </label>
        <select
          id="metric"
          value={selectedMetric}
          onChange={(e) => onMetricChange(e.target.value)}
          className="p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {metricOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <span className="font-medium">Sort Value:</span>
        <button
          onClick={onSortChange}
          className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          aria-label={`Sort order is currently ${sortOrder}. Click to toggle.`}
        >
          {sortOrder === "asc" ? "Ascending ▲" : "Descending ▼"}
        </button>
      </div>
    </div>
  );
}
