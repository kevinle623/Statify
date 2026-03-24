import { fetchJson } from "@/client/services/fetcher";

interface LogoutResponse {
  success: boolean;
  redirectTo: string;
}

export function logout() {
  return fetchJson<LogoutResponse>("/api/auth/logout", {
    method: "POST",
  });
}
