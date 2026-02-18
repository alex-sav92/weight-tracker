import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { WeightEntry } from "../types/WeightEntry";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

export default function WeightChart({ entries }: { entries: WeightEntry[] }) {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  const data = {
    labels: sorted.map((e) => e.date),
    datasets: [
      {
        label: "Weight (kg)",
        data: sorted.map((e) => e.weight),
        borderColor: "blue",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        pointHoverRadius: 6, // bigger hover point
        pointRadius: 4,      // default point radius
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} kg`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return <Line data={data} options={options} />;
}