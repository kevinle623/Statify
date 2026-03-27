import type { SpotifyArtistTopTracksResponse } from "@/types/spotify";
import { fetchJson } from "@/client/services/fetcher";

export async function fetchArtistTopTracks(artistId: string) {
  return fetchJson<SpotifyArtistTopTracksResponse>(
    `/api/artists/${artistId}/top-tracks`,
  );
}
