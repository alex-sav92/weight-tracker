import type { MeasurementChange as ChangeType } from "../utils/measurement";

type MeasurementChangeProps = {
  change: ChangeType;
};

export default function MeasurementChange({
  change,
}: MeasurementChangeProps) {
  if (change === "up") {
   return (
        <span className="text-red-500 font-bold">🠝</span>
    );
}

if (change === "down") {
  return (
    <span className="text-green-500 font-bold" aria-label="decreased">🠟</span>
  );
}

if (change === "same") {
  return (
    <span className="text-gray-400" aria-label="unchanged">
      →
    </span>
  );
}

  return null;
}