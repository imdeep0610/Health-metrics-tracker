import React, { useState, useEffect } from "react";
import HealthForm from "./components/HealthForm";
import MetricsTable from "./components/MetricsTable";
import MetricsChart from "./components/MetricsChart";
import FilterSortControls from "./components/FilterSortControls";
import ThemeToggle from "./components/ThemeToggle";
import { getTimeOfDay, exportToCSV } from "./utils/helpers";

const metricOptions = ["Weight", "Blood Pressure", "Heart Rate", "Sleep Hours"];

export default function App() {
  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem("healthMetrics");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMetric, setSelectedMetric] = useState("Weight");

  useEffect(() => {
    localStorage.setItem("healthMetrics", JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  function handleAddOrUpdate(data) {
    if (editingId !== null) {
      setMetrics((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...data } : item))
      );
      setEditingId(null);
    } else {
      const newItem = { ...data, id: Date.now() };
      setMetrics((prev) => [newItem, ...prev]);
    }
  }

  function handleDelete(id) {
    setMetrics((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function handleEdit(id) {
    setEditingId(id);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function toggleSortOrder() {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  function getFilteredSortedMetrics() {
    let filtered = metrics;
    if (filter !== "all") filtered = filtered.filter((item) => getTimeOfDay(item.timestamp) === filter);

    filtered = filtered
      .filter((item) => item.metric === selectedMetric)
      .sort((a, b) => (sortOrder === "asc" ? a.value - b.value : b.value - a.value));

    return filtered;
  }

  function handleExportCSV() {
    const dataToExport = getFilteredSortedMetrics().map(({ id, ...rest }) => rest);
    exportToCSV(dataToExport);
  }

  const editingData = editingId ? metrics.find((item) => item.id === editingId) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans transition-colors duration-300">
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight select-none">Health Metrics Tracker</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <HealthForm
            onSubmit={handleAddOrUpdate}
            editingData={editingData}
            cancelEdit={cancelEdit}
            metricOptions={metricOptions}
          />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <FilterSortControls
            filter={filter}
            onFilterChange={setFilter}
            sortOrder={sortOrder}
            onSortChange={toggleSortOrder}
            metricOptions={metricOptions}
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
        </section>

        <section className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-800">
          <MetricsTable
            data={getFilteredSortedMetrics()}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sortOrder={sortOrder}
            onSortChange={toggleSortOrder}
          />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 select-none">
            Trend Chart for <span className="capitalize">{selectedMetric}</span> (Today)
          </h2>
          <MetricsChart data={metrics} selectedMetric={selectedMetric} />
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400 focus:outline-none text-white rounded-lg transition"
            aria-label="Export data as CSV"
          >
            Export CSV
          </button>
        </div>
      </main>
    </div>
  );
}
