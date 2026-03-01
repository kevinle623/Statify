"use client";

import useSWRMutation from "swr/mutation";
import { logout } from "@/client/services/auth-service";

export function useLogout() {
  return useSWRMutation("logout", logout);
}
