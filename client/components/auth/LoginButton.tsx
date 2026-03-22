import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/client/components/ui/button";

interface LoginButtonProps {
  href?: string;
  label?: string;
}

export function LoginButton({
  href = "/api/auth/login",
  label = "Connect with Spotify",
}: LoginButtonProps) {
  return (
    <Button asChild size="lg">
      <Link href={href}>
        {label}
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}
