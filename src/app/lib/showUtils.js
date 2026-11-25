export const STATUSES = [
  { value: "watching", label: "Watching" },
  { value: "planned", label: "Planned" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
];

export const STATUS_LABEL = {
  watching: "Watching",
  planned: "Planned",
  paused: "Paused",
  completed: "Completed",
  dropped: "Dropped",
};

export function normalizeEpisode(value) {
  const episode = Number(value);

  if (!Number.isFinite(episode) || episode < 0) {
    return 0;
  }

  return Math.floor(episode);
}

export function titleHue(title) {
  let hash = 0;

  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % 360;
}
