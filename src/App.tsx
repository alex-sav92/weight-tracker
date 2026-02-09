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

  const exportData = () => {
    const data = JSON.stringify(entries, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "weight-data.json"
    a.click()

    URL.revokeObjectURL(url)
  }

  const importData = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string)

        if (!Array.isArray(parsed)) {
          alert("Invalid file format")
          return
        }
        if (!confirm("This will replace your current data. Continue?")) return
        
        setEntries(parsed)
        localStorage.setItem("weights", JSON.stringify(parsed))
      } catch (error) {
        alert("Failed to read file")
      }
    }

  reader.readAsText(file)
}

  return (
   <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-full md:max-w-3xl lg:max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        ⚖️ Weight Tracker
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Progress</h2>
          <WeightChart entries={entries} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={exportData}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Export data
            </button>

            <label className="cursor-pointer bg-gray-200 py-2 rounded text-center hover:bg-gray-300">
              Import data
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    importData(e.target.files[0])
                  }
                }}
              />
            </label>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
            <AddWeight onAdd={addEntry} />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
            <WeightList entries={entries} onDelete={deleteEntry} />
          </div>
        </div>
      </div>
  </div>
</div>
  );
}

export default App;
