import { useState } from "react";
import type { WeightEntry } from "../types/WeightEntry";

type Props = {
  onAdd: (entry: WeightEntry) => void;
};

export default function AddWeight({ onAdd }: Props) {
  const [weight, setWeight] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onAdd({
      id: crypto.randomUUID(),
      date: today,
      weight: parseFloat(weight),
    });

    setWeight("");
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.1"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>
  );
}