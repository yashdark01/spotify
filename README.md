# Music Player — Spotify-Style Streaming App

Full-stack music streaming application with Clerk authentication, MongoDB, Redux Toolkit player state, ShadCN UI, and admin uploads via Cloudinary.

**Author:** [Yash Patidar](https://yashpatidar.vercel.app) · [Portfolio case study](https://yashpatidar.vercel.app/work/music-player)  
**Repository:** [github.com/yashdark01/spotify](https://github.com/yashdark01/spotify)

---

## Features

| Area | Capabilities |
|------|----------------|
| **Streaming** | Audio playback, queue, next/previous, play/pause |
| **Discovery** | Featured, Made for You, and Trending sections (MongoDB `$sample` aggregation) |
| **Albums** | Album detail pages with linked songs |
| **Auth** | Clerk OAuth — sign in, session tokens, auto-refresh |
| **Admin** | Upload/delete songs & albums (Cloudinary + admin email gate) |
| **UI** | Spotify-inspired dark theme, ShadCN components, responsive layout |

---

## Tech stack

| Layer | Technologies |
|-------|----------------|
| **Frontend** | React 19, Vite 6, Redux Toolkit, React Router 7, Tailwind CSS 4, ShadCN UI, Clerk |
| **Backend** | Node.js, Express 4, MongoDB, Mongoose, Clerk Express SDK |
| **Media** | Cloudinary (admin uploads), static assets in `public/` for seeded demo |
| **Auth** | Clerk JWT — Bearer token on API requests |

---

## Project structure

```
spotify/
├── spotify-clone-client/     # React + Vite frontend (port 3000)
│   ├── src/
│   │   ├── components/     # UI, skeletons, Header, Footer
│   │   ├── layout/         # MainLayout, AudioPlayer, sidebars
│   │   ├── pages/          # Home, Album, Chat, Auth callback
│   │   ├── redux/          # player, playlist, auth, user slices
│   │   ├── providers/      # AuthProvider (Clerk token → axios)
│   │   └── lib/            # axios instance, utils
│   └── public/             # Demo songs, cover art, albums
│
├── spotify-clone-server/     # Express API (port 3001)
│   └── src/
│       ├── controller/     # Route handlers
│       ├── models/         # User, Song, Album, Message
│       ├── routes/         # API route definitions
│       ├── middleware/     # protectRoute, requireAdmin
│       ├── lib/            # db, cloudinary
│       └── server.js       # Database seed script
│
└── docs/
    ├── SETUP.md            # Detailed local setup
    └── API.md              # REST API reference
```

---

## Quick start

### Prerequisites

- Node.js 18+
- MongoDB Atlas or local MongoDB
- [Clerk](https://clerk.com) application (publishable + secret keys)
- [Cloudinary](https://cloudinary.com) account (for admin uploads)

### 1. Clone

```bash
git clone https://github.com/yashdark01/spotify.git
cd spotify
```

### 2. Backend

```bash
cd spotify-clone-server
cp .env.example .env
# Fill in MONGODB_URI, CLERK_*, CLOUDINARY_*, ADMIN_EMAIL
npm install
npm run dev
```

Server runs at **http://localhost:3001**

### 3. Seed database (optional)

With `MONGODB_URI` set in `.env`:

```bash
npm run seed
```

Seeds 14 demo songs and 4 albums using static files from the client `public/` folder.

### 4. Frontend

```bash
cd ../spotify-clone-client
cp .env.example .env
# Set VITE_CLERK_PUBLISHABLE_KEY
npm install
npm run dev
```

App runs at **http://localhost:3000**

---

## Environment variables

### Server (`spotify-clone-server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default `3001`) |
| `MONGODB_URI` | MongoDB connection string |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `ADMIN_EMAIL` | Email allowed to access admin routes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NODE_ENV` | `development` or `production` |

### Client (`spotify-clone-client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (same as server) |

See [docs/SETUP.md](./docs/SETUP.md) for Clerk redirect URLs and CORS notes.

---

## API overview

| Prefix | Description |
|--------|-------------|
| `GET /api` | Health check |
| `/api/auth` | User sync after Clerk sign-in |
| `/api/songs` | List, featured, trending, made-for-you, by ID |
| `/api/albums` | List albums, album by ID |
| `/api/user` | List users (authenticated) |
| `/api/admin` | Admin CRUD for songs/albums |
| `/api/stats` | Admin dashboard stats |

Full reference: [docs/API.md](./docs/API.md)

---

## Architecture

```
Browser (React + Redux)
        ↓  Bearer JWT (Clerk)
Express API — port 3001
  ├── Clerk middleware (session validation)
  ├── protectRoute / requireAdmin
  └── Controllers → Mongoose models
        ↓
MongoDB Atlas
        ↓
Cloudinary (admin audio/image uploads)
```

**Player state:** Redux Toolkit (`playerSlice`) manages `currentSong`, `queue`, `isPlaying`, and next/previous navigation.

**Recommendations:** Server uses MongoDB aggregation `$sample` for featured/trending/made-for-you — lightweight personalization without a separate ML pipeline.

---

## Scripts

### Client

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 3000) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

### Server

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with nodemon |
| `npm run seed` | Seed MongoDB with demo songs/albums |

---

## Trade-offs (portfolio highlights)

- **Redux Toolkit** over Context — predictable state for queue + playback across routes
- **MongoDB aggregation** (`$sample`) for discovery sections — server-side randomization, smaller payloads
- **Clerk** over custom JWT auth — faster OAuth, session management, admin role via email
- **Static demo assets** + optional Cloudinary — seeded catalog works without uploads; admin can add real media

---

## Related links

- **Portfolio:** [yashpatidar.vercel.app/work/music-player](https://yashpatidar.vercel.app/work/music-player)
- **GitHub:** [github.com/yashdark01/spotify](https://github.com/yashdark01/spotify)
- **LinkedIn:** [Yash Patidar](https://linkedin.com/in/yash-patidar-97a8861b3)

---

## License

MIT — see [LICENSE](./LICENSE) if present. Demo audio/cover assets are for portfolio use only.
