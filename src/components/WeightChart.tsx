import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { WeightEntry } from "../types/WeightEntry";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function WeightChart({ entries }: { entries: WeightEntry[] }) {
  const sorted = [...entries].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const data = {
    labels: sorted.map(e => e.date),
    datasets: [
      {
        label: "Weight (kg)",
        data: sorted.map(e => e.weight),
        borderColor: "blue",
      },
    ],
  };

  return <Line data={data} />;
}
