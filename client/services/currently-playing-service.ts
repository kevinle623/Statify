import type { SpotifyCurrentlyPlaying } from "@/types/spotify";
import { fetchJson } from "@/client/services/fetcher";

export async function fetchCurrentlyPlaying() {
  return fetchJson<SpotifyCurrentlyPlaying | null>(
    "/api/player/currently-playing",
  );
}
