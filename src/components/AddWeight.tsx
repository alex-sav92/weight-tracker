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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.1"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
}