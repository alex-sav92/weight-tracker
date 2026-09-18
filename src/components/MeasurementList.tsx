import type { MeasurementEntry } from "../types/MeasurementEntry";
import { formatDate } from "../utils/date";
import {
  getMeasurementChange,
  getPreviousMeasurementValue,
} from "../utils/measurement";
import MeasurementChange from "./MeasurementChange";

type MeasurementListProps = {
  measurements: MeasurementEntry[];
  onDelete: (id: string) => void;
};

export default function MeasurementList({
  measurements,
  onDelete,
}: MeasurementListProps) {
  if (measurements.length === 0) {
    return <p>No measurements recorded yet.</p>;
  }

  return (
    <div>
      <h2>Measurement History</h2>

      {measurements.map((entry, index) => {
        const previousChest = getPreviousMeasurementValue(
          measurements,
          index,
          "chest"
        );

        const previousWaist = getPreviousMeasurementValue(
          measurements,
          index,
          "waist"
        );

        const previousHips = getPreviousMeasurementValue(
          measurements,
          index,
          "hips"
        );

        return (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-semibold mb-5">
      Measurement History
    </h2>

    <div className="space-y-4">
      {measurements.map((entry, index) => {
        const previousChest = getPreviousMeasurementValue(
          measurements,
          index,
          "chest"
        );

        const previousWaist = getPreviousMeasurementValue(
          measurements,
          index,
          "waist"
        );

        const previousHips = getPreviousMeasurementValue(
          measurements,
          index,
          "hips"
        );

        return (
          <div
            key={entry.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">
                {formatDate(entry.date)}
              </h3>

              <button
                onClick={() => onDelete(entry.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>

            <div className="space-y-2 text-sm">
              {entry.chest !== undefined && (
                <p>
                  <span className="font-medium">Chest:</span>{" "}
                  {entry.chest} cm{" "}
                  <MeasurementChange
                    change={getMeasurementChange(
                      entry.chest,
                      previousChest
                    )}
                  />
                </p>
              )}

              {entry.waist !== undefined && (
                <p>
                  <span className="font-medium">Waist:</span>{" "}
                  {entry.waist} cm{" "}
                  <MeasurementChange
                    change={getMeasurementChange(
                      entry.waist,
                      previousWaist
                    )}
                  />
                </p>
              )}

              {entry.hips !== undefined && (
                <p>
                  <span className="font-medium">Hips:</span>{" "}
                  {entry.hips} cm{" "}
                  <MeasurementChange
                    change={getMeasurementChange(
                      entry.hips,
                      previousHips
                    )}
                  />
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
      })}
    </div>
  );
}