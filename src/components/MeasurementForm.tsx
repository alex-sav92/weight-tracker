import { useState } from "react";
import type { MeasurementEntry } from "../types/MeasurementEntry";

type MeasurementFormProps = {
  onAdd: (entry: MeasurementEntry) => void;
};

export default function MeasurementForm({ onAdd }: MeasurementFormProps) {
  const [date, setDate] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [neck, setNeck] = useState("");
  const [biceps, setBiceps] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chest && !waist && !hips && !neck && !biceps) {
      alert("Please enter at least one measurement.");
      return;
    }

    const entry: MeasurementEntry = {
      id: crypto.randomUUID(),
      date,
      ...(chest && { chest: Number(chest) }),
      ...(waist && { waist: Number(waist) }),
      ...(hips && { hips: Number(hips) }),
      ...(neck && { neck: Number(neck) }),
      ...(biceps && { biceps: Number(biceps) }),
    };

    onAdd(entry);

    setDate("");
    setChest("");
    setWaist("");
    setHips("");
    setNeck("");
    setBiceps("");
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-xl font-semibold mb-5">
      Body Measurements
    </h2>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chest (cm)
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          placeholder="e.g. 95.5"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Waist (cm)
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          placeholder="e.g. 78"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hips (cm)
        </label>

        <input
          type="number"
          step="0.1"
          min="0"
          value={hips}
          onChange={(e) => setHips(e.target.value)}
          placeholder="e.g. 101.5"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <button
      type="submit"
      className="mt-6 w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition"
    >
      Add Measurement
    </button>
  </form>
);
}