export const STATUSES = [
  { value: "watching", label: "Watching" },
  { value: "planned", label: "Plan to watch" },
  { value: "paused", label: "On hold" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
];

export const STATUS_LABEL = Object.fromEntries(
  STATUSES.map(({ value, label }) => [value, label]),
);

export function normalizeEpisode(value) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

export function titleHue(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1)
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  return hash % 360;
}
