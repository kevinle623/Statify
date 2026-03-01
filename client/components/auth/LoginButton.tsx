import Link from "next/link";
import { Disc3 } from "lucide-react";
import { Button } from "@/client/components/ui/button";

interface LoginButtonProps {
  href?: string;
  label?: string;
}

export function LoginButton({
  href = "/api/auth/login",
  label = "Continue with Spotify",
}: LoginButtonProps) {
  return (
    <Button asChild size="lg">
      <Link href={href}>
        <Disc3 className="size-4" />
        {label}
      </Link>
    </Button>
  );
}
