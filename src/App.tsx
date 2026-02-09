import { useEffect, useState } from "react";
import type { WeightEntry } from "./types/WeightEntry";
import { loadWeights, saveWeights } from "./utils/storage";
import AddWeight from "./components/AddWeight";
import WeightList from "./components/WeightList";
import WeightChart from "./components/WeightChart";

function App() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);

  useEffect(() => {
    setEntries(loadWeights());
  }, []);

  useEffect(() => {
    saveWeights(entries);
  }, [entries]);

  function addEntry(entry: WeightEntry) {
    setEntries([...entries, entry]);
  }

  function deleteEntry(id: string) {
    setEntries(entries.filter(e => e.id !== id));
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>⚖️ Weight Tracker</h1>
      <h1 className="text-3xl font-bold text-blue-600 text-center mt-8">
        Tailwind is working!
      </h1>
      <AddWeight onAdd={addEntry} />
      <WeightChart entries={entries} />
      <WeightList entries={entries} onDelete={deleteEntry} />
    </div>
  );
}

export default App;
