## Statify

Statify is a Spotify analytics dashboard that visualizes your listening habits with an editorial "digital archivist" aesthetic. Built on Next.js App Router with:

- Server-side Spotify Authorization Code auth
- Secure HTTP-only cookies for Spotify tokens
- SWR for client-side fetching and mutations
- Dark/light theme with Material Design 3 surface tokens
- Inter + Space Grotesk typography

## Environment

Create a local env file from `.env.example` and set:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REDIRECT_URI`
- `NEXT_PUBLIC_APP_URL`

**Important:** The redirect URI must use `http://127.0.0.1:3000` — Spotify's OAuth does not support `localhost` as a callback host. Set your redirect URI to:

```
http://127.0.0.1:3000/api/auth/callback
```

This must match exactly in both your `.env.local` file and your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) app settings.

## Getting Started

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

Open `http://127.0.0.1:3000` in your browser.

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

1. `client/components/` — UI components and screens for landing, dashboard, top items, history, auth, theme, and shared UI primitives.
2. `client/hooks/` — SWR-backed client hooks for auth status, top items, current playback, recent history, theme state, and mutations.
3. `client/services/` — Browser-side fetch wrappers that call the Next.js route handlers.
4. `client/lib/` — Client-only utilities such as `cn` and display constants like time-range labels.
5. `app/` — Next.js App Router pages, layouts, loading states, and API route handlers.
6. `server/services/` — Server-side application logic for Spotify auth and data fetching.
7. `server/adapters/` — Low-level Spotify API integrations.
8. `server/lib/` — Server-only env access, cookie helpers, session helpers, Spotify constants, typed error classes (`SpotifyApiError`, `SpotifyAuthError`), and the `withSpotifyAuth()` route handler wrapper.
9. `types/` — Shared TypeScript contracts for Spotify data and app-facing response shapes.

The runtime request flow is:

1. Client UI in `client/components/`
2. Client orchestration in `client/hooks/`
3. Browser fetch layer in `client/services/`
4. Next.js route handlers in `app/api/**`
5. Server business logic in `server/services/`
6. Spotify HTTP adapters in `server/adapters/`

## Pages

| Route         | Description                                           |
| ------------- | ----------------------------------------------------- |
| `/`           | Landing page (redirects to `/dashboard` if logged in) |
| `/dashboard`  | Now playing, quick stats, recent listening history    |
| `/artists`    | Top artists with time range filtering                 |
| `/tracks`     | Top tracks with time range filtering                  |
| `/history`    | Full listening history, grouped by day                |
| `/privacy`    | Privacy policy                                        |
| `/terms`      | Terms of service                                      |
| `/auth-error` | OAuth error page with reason-specific messaging       |

## Spotify Scopes

The current implementation requests only:

- `user-top-read`
- `user-read-currently-playing`
- `user-read-private`
- `user-read-recently-played`
