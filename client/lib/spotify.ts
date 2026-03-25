import type { SpotifyTimeRange } from "@/types/spotify";

export const SPOTIFY_TIME_RANGE_LABELS: Record<SpotifyTimeRange, string> = {
  short_term: "Last 4 weeks",
  medium_term: "Last 6 months",
  long_term: "All time",
};
