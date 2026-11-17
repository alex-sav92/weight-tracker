
import type { MeasurementChange as ChangeType } from "../utils/measurement";

type MeasurementChangeProps = {
  change: ChangeType;
};

export default function MeasurementChange({
  change,
}: MeasurementChangeProps) {
  if (change === "none") {
    return null;
  }

  const color =
    change === "up"
      ? "text-red-600"
      : change === "down"
        ? "text-green-600"
        : "text-gray-500";

  const label =
    change === "up"
      ? "increased"
      : change === "down"
        ? "decreased"
        : "unchanged";

  return (
    <svg
      className={`inline-block w-4 h-4 ${color}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      {change === "up" && (
        <path d="M12 19V5 M5 12l7-7 7 7" />
      )}

      {change === "down" && (
        <path d="M12 5v14 M19 12l-7 7-7-7" />
      )}

      {change === "same" && (
        <path d="M5 12h14 M13 6l6 6-6 6" />
      )}
    </svg>
  );
}
