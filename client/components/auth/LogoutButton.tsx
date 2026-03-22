"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLogout } from "@/client/hooks/use-logout";

export function LogoutButton() {
  const router = useRouter();
  const { trigger, isMutating } = useLogout();

  async function handleLogout() {
    const response = await trigger();
    router.push(response.redirectTo);
    router.refresh();
  }

  return (
    <button
      className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50 cursor-pointer hover:cursor-pointer"
      disabled={isMutating}
      onClick={handleLogout}
      type="button"
      aria-label="Log out"
    >
      <LogOut className="size-5" />
    </button>
  );
}
