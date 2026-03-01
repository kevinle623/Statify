import Link from "next/link";
import { cookies } from "next/headers";
import { Disc3, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { SPOTIFY_COOKIE_KEYS } from "@/server/lib/spotify";

export default async function NotFound() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has(SPOTIFY_COOKIE_KEYS.refreshToken);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel relative w-full overflow-hidden rounded-[32px] px-6 py-12 sm:px-10 sm:py-14">
        <div className="aurora absolute inset-0 opacity-80" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-[24px] border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
            <Disc3 className="size-7" />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-400">
            404
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
            This page drifted off the playlist.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            The route you tried to open does not exist anymore, or the link is
            wrong.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">
                <Home className="size-4" />
                Back home
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={isAuthenticated ? "/dashboard" : "/api/auth/login"}>
                <LayoutDashboard className="size-4" />
                {isAuthenticated ? "Open dashboard" : "Connect Spotify"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
