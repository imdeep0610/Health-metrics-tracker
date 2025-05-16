# Health Metrics Tracker

A responsive React web application to input, track, visualize, and manage personal health metrics such as step count, water intake, and heart rate.

---

## 🧠 Features

- ✅ **Health Data Input**
  - Add metrics with timestamps and values (e.g., “Water Intake: 500ml at 8 AM”).
  - Form validation to prevent empty or invalid inputs.

- 📊 **Data Visualization**
  - Line or bar chart (via Recharts) to show metric trends for the current day.
  - Automatically updates with new entries.

- 📋 **Data Table**
  - Displays metric entries in a sortable table.
  - Shows the most recent entries at the top.

- 🔎 **Filtering & Sorting**
  - Filter entries by time of day (morning, afternoon, evening).
  - Sort data by metric value in ascending or descending order.

- 💾 **Data Persistence**
  - Uses `localStorage` to save and restore data on page reload.

- 🌙 **Optional Features**
  - Edit or delete existing entries.
  - Dark mode toggle.
  - Export data as a CSV file.

- 📱 **Responsive Design**
  - Fully responsive for both mobile and desktop views using Tailwind CSS.

---

## ⚙️ Tech Stack

- **React** – UI and state management with hooks
- **Tailwind CSS** – Fast and responsive styling
- **Recharts** – Data visualization
- **LocalStorage** – Persistent data without a backend



