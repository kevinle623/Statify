import type { SpotifyUserProfile } from "@/types/spotify";
import { fetchJson } from "@/client/services/fetcher";

export async function fetchProfile() {
  return fetchJson<SpotifyUserProfile>("/api/profile");
}
