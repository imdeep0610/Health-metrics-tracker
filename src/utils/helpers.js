// Determine time of day string from ISO timestamp
export function getTimeOfDay(timestamp) {
  const date = new Date(timestamp);
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 21) return "evening";
  return "night";
}

// CSV export helper
export function exportToCSV(data) {
  if (!data.length) {
    alert("No data to export.");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((field) => {
          const escaped = ("" + row[field]).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ];
  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "health_metrics.csv";
  a.click();
  URL.revokeObjectURL(url);
}
