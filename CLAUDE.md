# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Statify is a Spotify analytics dashboard built with Next.js 16 (App Router), React 19, and TypeScript. It uses Bun as the package manager and runtime.

## Commands

```bash
bun install              # Install dependencies (use --frozen-lockfile in CI)
bun run dev              # Start dev server (Turbopack enabled)
bun run build            # Production build
bun run lint             # ESLint (Next.js core web vitals + TypeScript)
bun run test             # Unit tests (Vitest)
bun run format           # Format with Prettier
bun run format:check     # Check formatting without writing
```

To run a single test file: `bunx vitest run path/to/file.test.ts`

## Architecture

The codebase follows a client/server separation with Next.js App Router as the glue layer:

```
app/          → Next.js pages and API route handlers
  (app)/      → Authenticated pages (session-gated via layout)
  api/        → Route handlers that proxy to Spotify API
  privacy/    → Public privacy policy page
  terms/      → Public terms of service page
  auth-error/ → OAuth error page with reason-specific messaging
client/       → Browser-side code
  components/ → UI screens organized by feature (landing, dashboard, auth, etc.)
  hooks/      → SWR-based data fetching hooks
  services/   → Typed fetch wrappers for API calls
  lib/        → Client utilities
server/       → Server-side code
  services/   → Auth and data orchestration
  adapters/   → Low-level Spotify API HTTP clients
  lib/        → Env validation, cookies, sessions, constants
types/        → Shared TypeScript types for Spotify data models
```

**Request flow:** Client components → SWR hooks → client services (fetch) → Next.js API routes → server services → Spotify adapters → Spotify API

**Auth:** Server-side OAuth authorization code flow. Tokens stored in HTTP-only cookies. Session validation via `requireSpotifySession()` in server services. Auth errors redirect to `/auth-error` with a `reason` query param (`denied`, `state_mismatch`, `token_error`, `unknown`). Logged-in users visiting `/` are redirected to `/dashboard`.

**Server patterns:**
- All authenticated API routes use `withSpotifyAuth()` from `server/lib/route-handler.ts` — handles token validation, 401/403/500 responses, and session cleanup in one place.
- Typed error classes in `server/lib/errors.ts`: `SpotifyApiError` (web API failures with status codes) and `SpotifyAuthError` (token exchange/refresh failures with Spotify error codes). Never use ad-hoc error casts.
- Magic numbers (token buffer, cookie TTLs, default limits) live in `server/lib/spotify.ts` as named constants.

**Styling:** Tailwind CSS v4 with CSS custom properties for dark/light theming (`data-theme` attribute on `<html>`). Design system uses Material Design 3 surface hierarchy tokens (#0A0A0A → #353534), ghost borders (`border: 1px solid rgba(255,255,255,0.05)`), and Inter + Space Grotesk typography. UI components from shadcn/ui (new-york style). Path alias `@/*` maps to project root.

**Navigation:** Desktop uses a fixed left sidebar (w-64) + top header + bottom footer. Mobile uses a top header (3-col grid layout) + bottom tab bar. No hamburger menu.

## Local Development

Use `http://127.0.0.1:3000` (not `localhost`) — Spotify's OAuth callback does not support `localhost`. Set your Spotify app redirect URI and `SPOTIFY_REDIRECT_URI` env var to `http://127.0.0.1:3000/api/auth/callback`.

## Testing

Vitest with globals enabled, node environment. Tests are colocated with source files (`*.test.ts`).

## Environment

Copy `.env.example` for required Spotify OAuth credentials. Server-only env vars are validated at startup in `server/lib/env.ts`. CI loads these from GitHub secrets.

## Code Style

- Prettier: semicolons, double quotes, trailing commas
- Strict TypeScript (`noEmit: true`)
- Remote images from `i.scdn.co` and `mosaic.scdn.co` are configured in `next.config.ts`

## Workflow

- Do not use preview tools for testing unless explicitly asked. The user will handle testing themselves.
