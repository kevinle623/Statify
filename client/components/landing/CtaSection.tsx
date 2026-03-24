import Link from "next/link";
import { LoginButton } from "@/client/components/auth/LoginButton";
import { Button } from "@/client/components/ui/button";

export function CtaSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="px-6 lg:px-16 py-24 lg:py-40 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-4xl lg:text-6xl font-extrabold font-headline tracking-tighter mb-10 max-w-2xl mx-auto">
          READY TO ARCHIVE YOUR JOURNEY?
        </h2>
        {isAuthenticated ? (
          <Button asChild size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        ) : (
          <LoginButton label="Start Exploration Now" />
        )}
      </div>
    </section>
  );
}
