import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { ErrorPageFooter } from "@/client/components/app-shell/ErrorPageFooter";

export const metadata = {
  title: "Authentication Error — Statify",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;

  const messages: Record<string, { title: string; description: string }> = {
    denied: {
      title: "Access Denied.",
      description:
        "You declined the Spotify authorization request. Statify needs permission to access your listening data to work.",
    },
    state_mismatch: {
      title: "Security Check Failed.",
      description:
        "The authorization state could not be verified. This can happen if the login session expired or the request was tampered with.",
    },
    token_error: {
      title: "Token Exchange Failed.",
      description:
        "We were unable to complete the authentication handshake with Spotify. This is usually a temporary issue on Spotify's end.",
    },
    not_whitelisted: {
      title: "Closed Beta.",
      description:
        "Statify is currently in a closed beta and your Spotify account hasn't been granted access yet. Only pre-approved accounts can sign in during this phase.",
    },
    unknown: {
      title: "Something Went Wrong.",
      description:
        "An unexpected error occurred during the authentication process. Please try again or contact the administrator if the issue persists.",
    },
  };

  const { title, description } = messages[reason ?? ""] ?? messages.unknown;
  const isClosedBeta = reason === "not_whitelisted";

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] ${isClosedBeta ? "bg-primary" : "bg-error"}`}
        />
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-16 py-16">
        <div className="w-full max-w-2xl text-center">
          {isClosedBeta ? (
            <>
              <div className="inline-flex items-center gap-2 ghost-border bg-white/5 px-4 py-2 mb-8">
                <Lock className="size-3 text-primary" />
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">
                  Invite Only
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter text-on-surface font-headline mb-8">
                {title}
              </h1>

              <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mx-auto mb-6">
                {description}
              </p>

              <p className="text-on-surface-variant/60 text-sm leading-relaxed max-w-md mx-auto mb-12">
                Want access? Reach out to the administrator with your Spotify
                email so it can be added to the allow list.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 font-headline font-bold text-sm tracking-wide transition-all active:scale-95"
                >
                  <ArrowLeft className="size-4" />
                  BACK TO HOME
                </Link>
              </div>
            </>
          ) : (
            <>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-error block mb-6">
                Authentication Error
              </span>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter text-on-surface font-headline mb-8">
                {title}
              </h1>

              <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mx-auto mb-12">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/api/auth/login"
                  className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 font-headline font-bold text-sm tracking-wide transition-all active:scale-95"
                >
                  TRY AGAIN
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 ghost-border bg-white/5 hover:bg-white/10 text-on-surface px-8 py-4 font-headline font-bold text-sm tracking-wide transition-all active:scale-95"
                >
                  <ArrowLeft className="size-4" />
                  BACK TO HOME
                </Link>
              </div>

              <p className="mt-16 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                If this keeps happening, please contact the administrator.
              </p>
            </>
          )}
        </div>
      </main>

      <ErrorPageFooter />
    </div>
  );
}
