# Spotify Clone — Client

React + Vite frontend for the Music Player streaming app.

## Stack

- React 19, Vite 6
- Redux Toolkit (player, playlist, auth, user)
- Clerk authentication
- Tailwind CSS 4 + ShadCN UI
- React Router 7

## Run locally

```bash
cp .env.example .env
# Set VITE_CLERK_PUBLISHABLE_KEY
npm install
npm run dev
```

App: **http://localhost:3000**

Backend must be running at **http://localhost:3001** (see `../spotify-clone-server`).

## Key paths

| Path | Component |
|------|-----------|
| `/` | Home — featured, made-for-you, trending |
| `/albums/:id` | Album detail |
| `/chat` | Chat UI (client-side demo) |
| `/auth-callback` | Post-login MongoDB user sync |
| `/sso-callback` | Clerk OAuth redirect |

## Redux slices

| Slice | Purpose |
|-------|---------|
| `playerSlice` | Current song, queue, play/pause, next/prev |
| `playlistSlice` | Playlist state |
| `authSlice` | Admin status check |
| `userSlice` | User profile data |

## Environment

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

## Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # ESLint
```

Full docs: [../README.md](../README.md) · [../docs/SETUP.md](../docs/SETUP.md)
