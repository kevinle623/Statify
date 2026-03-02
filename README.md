## Statify

Statify is a Spotify analytics app rebuilt on the Next.js App Router with:

- a simple glass-heavy UI that still feels like a normal Vercel-style app
- server-side Spotify Authorization Code auth
- secure HTTP-only cookies for Spotify tokens
- SWR for client-side fetching and mutations

## Environment

Create a local env file from `.env.example` and set:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REDIRECT_URI`
- `NEXT_PUBLIC_APP_URL`

The redirect URI must match your Spotify app settings exactly.

## Getting Started

Run the development server:

```bash
bun run dev
```

Open `http://127.0.0.1:3000`.

Install dependencies:

```bash
bun install
```

## Development Checks

Run ESLint:

```bash
bun run lint
```

Run Prettier in check mode:

```bash
bun run format:check
```

Format the codebase:

```bash
bun run format
```

Run unit tests:

```bash
bun run test
```

Run a production build:

```bash
bun run build
```

## Architecture

The app is organized around a client/server split:

1. `client/components/`
   UI components and screens for landing, dashboard, top items, history, auth, theme, and shared UI primitives.
2. `client/hooks/`
   SWR-backed client hooks for auth status, top items, current playback, recent history, theme state, and mutations.
3. `client/services/`
   Browser-side fetch wrappers that call the Next.js route handlers.
4. `client/lib/`
   Client-only utilities such as `cn` and display constants like time-range labels.
5. `app/`
   Next.js App Router pages, layouts, loading states, and API route handlers.
6. `server/services/`
   Server-side application logic for Spotify auth and data fetching.
7. `server/adapters/`
   Low-level Spotify API integrations.
8. `server/lib/`
   Server-only env access, cookie helpers, session helpers, and Spotify auth constants.
9. `types/`
   Shared TypeScript contracts for Spotify data and app-facing response shapes.

The runtime request flow is:

1. client UI in `client/components/`
2. client orchestration in `client/hooks/`
3. browser fetch layer in `client/services/`
4. Next.js route handlers in `app/api/**`
5. server business logic in `server/services/`
6. Spotify HTTP adapters in `server/adapters/`

## Spotify scopes

The current implementation requests only:

- `user-top-read`
- `user-read-currently-playing`
- `user-read-private`
- `user-read-recently-played`
