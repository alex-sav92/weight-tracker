import type { WeightEntry } from "../types/WeightEntry";

type Props = {
  entries: WeightEntry[];
  onDelete: (id: string) => void;
};

export default function WeightList({ entries, onDelete }: Props) {
  return (
    <ul>
      {entries.map(e => (
        <li key={e.id}>
          {e.date} — {e.weight} kg
          <button onClick={() => onDelete(e.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
