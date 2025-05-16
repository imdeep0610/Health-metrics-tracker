import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function filterTodayData(data, metric) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return data
    .filter(
      (item) =>
        item.metric === metric && new Date(item.timestamp) >= startOfDay
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map(({ timestamp, value }) => ({
      time: new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value,
    }));
}

export default function MetricsChart({ data, selectedMetric }) {
  const chartData = filterTodayData(data, selectedMetric);

  if (chartData.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 italic">
        No data for {selectedMetric} today to show on the chart.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
