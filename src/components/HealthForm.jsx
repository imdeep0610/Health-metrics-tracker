import React from "react";

export default function HealthForm({ onSubmit, editingData, cancelEdit, metricOptions }) {
  const [metric, setMetric] = React.useState(editingData?.metric || metricOptions[0]);
  const [value, setValue] = React.useState(editingData?.value || "");
  const [timestamp, setTimestamp] = React.useState(
    editingData ? editingData.timestamp.slice(0, 16) : new Date().toISOString().slice(0, 16)
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!value || isNaN(value) || Number(value) <= 0) {
      alert("Please enter a valid positive number for value.");
      return;
    }
    onSubmit({ metric, value: parseFloat(value), timestamp: new Date(timestamp).toISOString() });
    setValue("");
  }

  React.useEffect(() => {
    if (editingData) {
      setMetric(editingData.metric);
      setValue(editingData.value);
      setTimestamp(editingData.timestamp.slice(0, 16));
    }
  }, [editingData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      aria-label="Add or edit health metric"
    >
      <label className="flex flex-col text-sm font-medium">
        Metric
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-required="true"
        >
          {metricOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-sm font-medium">
        Value
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-required="true"
          min="0.01"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Date & Time
        <input
          type="datetime-local"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-required="true"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          {editingData ? "Update" : "Add"}
        </button>
        {editingData && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md shadow-sm transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
