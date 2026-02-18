import type { JSX } from "react/jsx-runtime";
import type { WeightEntry } from "../types/WeightEntry";

type Props = {
  entries: WeightEntry[];
  onDelete: (id: string) => void;
};

export default function WeightList({ entries, onDelete }: Props) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

 return (
    <ul className="divide-y divide-gray-200">
      {sorted.map((e, idx) => {
        // Compare to previous entry for arrow
        let arrow: JSX.Element | null = null;

        if (idx < sorted.length - 1) {
          const prev = sorted[idx + 1].weight;
          if (e.weight > prev) {
            arrow = <span className="text-red-500 font-bold">↑</span>;
          } else if (e.weight < prev) {
            arrow = <span className="text-green-500 font-bold">↓</span>;
          } else {
            arrow = <span className="text-gray-400">→</span>;
          }
        }
        
        return (
          <li
            key={e.id}
            className="flex justify-between items-center py-2"
          >
            <span className="flex items-center">
              {arrow} {e.date} — {e.weight} kg 
            </span>
            <button
              onClick={() => onDelete(e.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </li>
        );
      })}
    </ul>
  );
}