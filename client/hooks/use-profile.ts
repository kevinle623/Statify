"use client";

import useSWR from "swr";
import type { SpotifyUserProfile } from "@/types/spotify";
import { fetchProfile } from "@/client/services/profile-service";

export function useProfile() {
  const { data, error, isLoading } = useSWR<SpotifyUserProfile>(
    "profile",
    fetchProfile,
    {
      revalidateOnFocus: false,
    },
  );

  return { data: data ?? null, isLoading, error: error?.message ?? null };
}
