
import { useState } from "react";
import type { WeightEntry } from "../types/WeightEntry";
import { formatDate } from "../utils/date";
import {
  getMeasurementChange,
} from "../utils/measurement";
import MeasurementChange from "./MeasurementChange";

type Props = {
  entries: WeightEntry[];
  onDelete: (id: string) => void;
};

export default function WeightList({ entries, onDelete }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const visibleEntries = isExpanded
    ? sorted
    : sorted.slice(0, 5);

  return (
    <ul className="divide-y divide-gray-200">
      {visibleEntries.map((e, idx) => {
        // Compare with the next older entry
        const previousWeight =
          idx < sorted.length - 1
            ? sorted[idx + 1].weight
            : undefined;

        const change = getMeasurementChange(
          e.weight,
          previousWeight
        );

        return (
          <li
            key={e.id}
            className="flex justify-between items-center py-2"
          >
            <span className="flex items-center gap-2">
              <MeasurementChange change={change} />
              {formatDate(e.date)} — {e.weight} kg
            </span>

            <button
              onClick={() => {
                const confirmed = window.confirm(
                  `Delete entry: ${formatDate(e.date)} (${e.weight} kg)?`
                );

                if (confirmed) {
                  onDelete(e.id);
                }
              }}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </li>
        );
      })}

      {entries.length > 5 && (
        <li className="pt-4">
          <button
            onClick={() => setIsExpanded((current) => !current)}
            className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            {isExpanded ? "Show less" : "Show all"}
            <span>{isExpanded ? "↑" : "↓"}</span>
          </button>
        </li>
      )}
    </ul>
  );
}
