import { useEffect, useRef } from "react";
import {
  Chart,
  type ChartConfiguration,
  registerables,
} from "chart.js";
import type { MeasurementEntry } from "../types/MeasurementEntry";
import { formatDate } from "../utils/date";

Chart.register(...registerables);

type MeasurementChartProps = {
  measurements: MeasurementEntry[];
};

export default function MeasurementChart({
  measurements,
}: MeasurementChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const sortedMeasurements = [...measurements].sort(
      (a, b) => a.date.localeCompare(b.date)
    );

    const labels = sortedMeasurements.map((entry) =>
      formatDate(entry.date)
    );

    const configuration: ChartConfiguration = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Chest",
            data: sortedMeasurements.map((entry) =>
              entry.chest ?? null
            ),
            tension: 0.3,
          },
          {
            label: "Waist",
            data: sortedMeasurements.map((entry) =>
              entry.waist ?? null
            ),
            tension: 0.3,
          },
          {
            label: "Hips",
            data: sortedMeasurements.map((entry) =>
              entry.hips ?? null
            ),
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;

                return `${context.dataset.label}: ${
                  value !== null ? `${value} cm` : "N/A"
                }`;
              },
            },
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Centimeters",
            },
          },
        },
      },
    };

    chartRef.current = new Chart(canvasRef.current, configuration);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [measurements]);

  if (measurements.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-5">
        Body Measurements Progress
      </h2>

      <div className="h-80">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}