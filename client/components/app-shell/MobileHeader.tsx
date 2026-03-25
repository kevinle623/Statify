import Link from "next/link";
import { Logo } from "@/client/components/ui/logo";
import { ThemeToggle } from "@/client/components/theme/ThemeToggle";
import { LogoutButton } from "@/client/components/auth/LogoutButton";

export function MobileHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:hidden h-16 flex items-center justify-between px-6 z-40 bg-background/80 backdrop-blur-md border-b border-divider">
      {/* Left: logo */}
      <Link href="/dashboard">
        <Logo />
      </Link>

      {/* Right: controls */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
