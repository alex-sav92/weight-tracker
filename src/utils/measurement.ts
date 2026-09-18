import type { MeasurementEntry } from "../types/MeasurementEntry";

export type MeasurementChange = "up" | "down" | "same" | "none";

export function getMeasurementChange(
  currentValue: number | undefined,
  previousValue: number | undefined
): MeasurementChange {
  if (currentValue === undefined || previousValue === undefined) {
    return "none";
  }

  if (currentValue > previousValue) {
    return "up";
  }

  if (currentValue < previousValue) {
    return "down";
  }

  return "same";
}

export function getPreviousMeasurementValue(
  measurements: MeasurementEntry[],
  currentIndex: number,
  field: "chest" | "waist" | "hips"
): number | undefined {
  for (let index = currentIndex + 1; index < measurements.length; index++) {
    const value = measurements[index][field];

    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}