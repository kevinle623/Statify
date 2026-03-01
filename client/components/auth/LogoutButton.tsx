"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/client/hooks/use-logout";
import { Button } from "@/client/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const { trigger, isMutating } = useLogout();

  async function handleLogout() {
    const response = await trigger();
    router.push(response.redirectTo);
    router.refresh();
  }

  return (
    <Button
      disabled={isMutating}
      onClick={handleLogout}
      type="button"
      variant="secondary"
    >
      {isMutating ? "Logging out..." : "Log out"}
    </Button>
  );
}
