import type { WeightEntry } from "../types/WeightEntry";

const KEY = "weights";

export function loadWeights(): WeightEntry[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveWeights(entries: WeightEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}