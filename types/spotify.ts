export type SpotifyTimeRange = "short_term" | "medium_term" | "long_term";

export type SpotifyTopItemType = "artists" | "tracks";

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyTrackAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  album: SpotifyTrackAlbum;
  artists: Pick<SpotifyArtist, "id" | "name">[];
}

export interface SpotifyUserProfile {
  id: string;
  display_name: string;
  country: string;
  product: string;
  images: SpotifyImage[];
}

export interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  progress_ms?: number;
  item: SpotifyTrack | null;
}

export interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

export interface SpotifyRecentlyPlayedResponse {
  items: SpotifyRecentlyPlayedItem[];
  next: string | null;
  cursors?: {
    after?: string;
    before?: string;
  };
  limit: number;
  href: string;
}

export interface SpotifyTopResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
