export type ProgressState = {
  highest: number;
};

const KEY = "portal-progress";

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return { highest: 0 };
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { highest: 0 };
  try {
    return JSON.parse(raw) as ProgressState;
  } catch {
    return { highest: 0 };
  }
}

export function writeProgress(next: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function markSolved(id: number) {
  const cur = readProgress();
  if (id > cur.highest) writeProgress({ highest: id });
}

export function solved(id: number) {
  const cur = readProgress();
  return cur.highest >= id;
}