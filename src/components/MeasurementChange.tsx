import type { MeasurementChange as ChangeType } from "../utils/measurement";

type MeasurementChangeProps = {
  change: ChangeType;
};

export default function MeasurementChange({
  change,
}: MeasurementChangeProps) {
  if (change === "up") {
  return (
    <span
      className="text-red-600 font-semibold"
      aria-label="increased"
    >
      ↑
    </span>
  );
}

if (change === "down") {
  return (
    <span
      className="text-green-600 font-semibold"
      aria-label="decreased"
    >
      ↓
    </span>
  );
}

if (change === "same") {
  return (
    <span
      className="text-gray-500 font-semibold"
      aria-label="unchanged"
    >
      →
    </span>
  );
}

  return null;
}