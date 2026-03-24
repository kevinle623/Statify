import type { SpotifyRecentlyPlayedItem } from "@/types/spotify";

function getDayLabel(value: string) {
  const date = new Date(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / 86_400_000,
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function groupByDay(items: SpotifyRecentlyPlayedItem[]) {
  const groups = new Map<string, SpotifyRecentlyPlayedItem[]>();

  items.forEach((item) => {
    const label = getDayLabel(item.played_at);
    groups.set(label, [...(groups.get(label) ?? []), item]);
  });

  return [...groups.entries()];
}

export function getSectionId(label: string) {
  return `history-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
