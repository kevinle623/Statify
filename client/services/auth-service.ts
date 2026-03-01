import { fetchJson } from "@/client/services/fetcher";

export interface AuthStatusResponse {
  authenticated: boolean;
}

export function fetchAuthStatus() {
  return fetchJson<AuthStatusResponse>("/api/auth/status");
}

export interface LogoutResponse {
  success: boolean;
  redirectTo: string;
}

export function logout() {
  return fetchJson<LogoutResponse>("/api/auth/logout", {
    method: "POST",
  });
}
