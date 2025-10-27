/*
 * Analytics Dashboard Component
 * Displays three charts visualizing spam detection results:
 * 1. Pie Chart: Distribution of spam vs ham messages
 * 2. Bar Chart: Confidence scores for each message
 * 3. Line Chart: Trend of confidence scores over time
 */


import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and plugins
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Graphs() {
  // Load prediction history from localStorage
  const history = JSON.parse(localStorage.getItem("spamurai_history")) || [];

  // Calculate statistics
  const spamCount = history.filter((h) => h.prediction === "Spam").length;
  const hamCount = history.length - spamCount;
  const total = spamCount + hamCount;

  /* PIE CHART Configuration */
  const pieData = {
    labels: ["Spam", "Ham"],
    datasets: [
      {
        data: [spamCount, hamCount],
        backgroundColor: ["#f33737ff", "#4ae764ff"], // Red for spam, green for ham
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#828080ff", font: { size: 16 } },
      },
      tooltip: {
        callbacks: {
          // Custom tooltip showing count and percentage
          label: (context) => {
            const label = context.label || "";
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        // Show percentage on pie slices
        formatter: (value) => {
          if (total === 0) return "0%";
          return `${((value / total) * 100).toFixed(1)}%`;
        },
      },
    },
  };

  /* BAR CHART Configuration */
  const barData = {
    labels: history.map((_, i) => `#${i + 1}`),
    datasets: [
      {
        label: "Spam Confidence (%)",
        data: history.map((h) => h.score * 100),
        backgroundColor: "#339af0", // Blue bars
      },
    ],
  };

  const barOptions = {
    plugins: {
       legend: {
        position: "bottom",
        labels: { color: "#828080ff", font: { size: 16 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(1)}% confidence`,
        },
      },
      datalabels: { display: false }, // Hide data labels on bars
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Confidence (%)" },
      },
    },
  };

  /* LINE CHART Configuration */
  const lineData = {
    labels: history.map((_, i) => `#${i + 1}`),
    datasets: [
      {
        label: "Confidence Trend (%)",
        data: history.map((h) => h.score * 100),
        borderColor: "#845ef7",
        backgroundColor: "#845ef7", // Purple line
        fill: false,
        tension: 0.3, // Smooth curve
      }, 
    ],
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#828080ff", font: { size: 16 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(1)}% confidence`,
        },
      },
      datalabels: { display: false },   // Hide data labels on line
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Confidence (%)" },
      },
    },
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4 fw-bold">Spamurai Analytics Dashboard</h2>
      <h5 className="text-muted mb-5">
        Below graphs represent the spam detection results:
      </h5>

      <div className="chart-section d-flex flex-column align-items-center gap-5">
        {/* Pie chart */}
        <div className="chart-box p-4 rounded shadow-sm w-100" style={{ maxWidth: "500px" }}>
          <h5 className="mb-3">Spam vs Ham Distribution</h5>
          <p className="mb-2">This pie chart shows the distribution of spam and ham Messages/Emails.</p>
          <p className="text-muted mb-4"> (Total Messages/Emails: {total})</p>
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* Bar chart */}
        <div className="chart-box p-4 rounded shadow-sm w-100" style={{ maxWidth: "700px" }}>
          <h5 className="mb-3">Spam Confidence Score per Message/Email</h5>
          <p className="mb-2">This bar chart shows the spam confidence score for each Message/Email.</p>
          <p className="text-muted mb-4"> (Higher score indicates higher likelihood of being spam)</p>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Line chart */}
        <div className="chart-box p-4 rounded shadow-sm w-100" style={{ maxWidth: "700px" }}>
          <h5 className="mb-3">Confidence Trend Over Time</h5>
          <p className="mb-2">This line chart shows the trend of spam confidence scores over your Messages/Emails.</p>
          <p className="text-muted mb-4"> (Observe how confidence scores change with each new Message/Email)</p>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}
