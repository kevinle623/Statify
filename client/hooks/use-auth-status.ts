"use client";

import useSWR from "swr";
import { fetchAuthStatus } from "@/client/services/auth-service";

export function useAuthStatus(initialAuthenticated: boolean) {
  const { data, isLoading } = useSWR(
    initialAuthenticated ? null : "auth-status",
    fetchAuthStatus,
    {
      revalidateOnFocus: false,
      fallbackData: initialAuthenticated ? { authenticated: true } : undefined,
    },
  );

  return {
    isAuthenticated: data?.authenticated ?? initialAuthenticated,
    isLoading,
  };
}
