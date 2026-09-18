import type { MeasurementEntry } from "../types/MeasurementEntry";

const KEY = "measurements";

export function loadMeasurements(): MeasurementEntry[] {
  const raw = localStorage.getItem(KEY);

  return raw ? JSON.parse(raw) : [];
}

export function saveMeasurements(entries: MeasurementEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}