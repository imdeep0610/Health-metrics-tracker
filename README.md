# Health Metrics Tracker

A responsive React web application to track, visualize, and manage personal health metrics like step count, water intake, and heart rate. This app allows users to input data with timestamps, view trends over time with charts, filter and sort entries, and export data for external use.

---

## Features

- **Health Data Input:** Add metrics with timestamp and value, with validation to prevent empty or invalid inputs.
- **Data Visualization:** Display data in a table sorted by time (most recent first) and visualize trends over time with a dynamic line chart.
- **Filtering & Sorting:** Filter data by parts of the day (morning, afternoon, evening) and sort by metric values in ascending or descending order.
- **Data Persistence:** All data is saved locally using `localStorage`, so entries persist between sessions.
- **Bonus Features:**
  - Edit or delete existing entries.
  - Dark mode toggle for comfortable viewing.
  - Export all health data as a CSV file for offline use.

---

## Tech Stack

- **React** with functional components and hooks
- **Tailwind CSS** for responsive and modern styling
- **Recharts** for data visualization
- LocalStorage for client-side persistence

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/health-metrics-tracker.git
   cd health-metrics-tracker

