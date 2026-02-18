import type { WeightEntry } from "../types/WeightEntry";

type Props = {
  entries: WeightEntry[];
  onDelete: (id: string) => void;
};

export default function WeightList({ entries, onDelete }: Props) {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <ul className="divide-y divide-gray-200">
      {sortedEntries.map((e) => (
        <li key={e.id} className="flex justify-between items-center py-2">
          <span>{e.date} — {e.weight} kg</span>
          <button
            onClick={() => onDelete(e.id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}
