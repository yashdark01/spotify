# Music Player

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
| **UI** | Dark streaming-style theme, ShadCN components, responsive layout |

---

## Tech stack

| Layer | Technologies |
|-------|----------------|
| **Frontend** | React 19, Vite 6, Redux Toolkit, React Router 7, Tailwind CSS 4, ShadCN UI, Clerk |
| **Backend** | Node.js, Express 4, MongoDB, Mongoose, Clerk Express SDK |
| **Media** | Cloudinary (admin uploads), static assets in `public/` for seeded demo |

---

## Project structure

```
spotify/                      # repo name (GitHub: yashdark01/spotify)
├── client/      # React + Vite frontend (port 3000)
├── server/      # Express API (port 3001)
└── docs/
    ├── SETUP.md
    ├── API.md
    └── FIX-PLAN.md           # Known bugs + fix roadmap
```

---

## Quick start

```bash
git clone https://github.com/yashdark01/spotify.git
cd spotify

# Server
cd server
cp .env.example .env   # fill in keys
npm install
npm run dev

# Seed (optional)
npm run seed

# Client (new terminal)
cd ../client
cp .env.example .env
npm install
npm run dev
```

- **App:** http://localhost:3000  
- **API:** http://localhost:3001/api  

Full setup: [docs/SETUP.md](./docs/SETUP.md)

---

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/SETUP.md](./docs/SETUP.md) | Clerk, MongoDB, Cloudinary, troubleshooting |
| [docs/API.md](./docs/API.md) | REST API reference |
| [docs/FIX-PLAN.md](./docs/FIX-PLAN.md) | Broken functionality audit + fix phases |

---

## Scripts

### Client (`client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

### Server (`server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | API with nodemon |
| `npm run seed` | Seed demo songs/albums |
| `npm run start` | Production start |

---

## Related links

- [Portfolio case study](https://yashpatidar.vercel.app/work/music-player)
- [GitHub](https://github.com/yashdark01/spotify)
- [LinkedIn](https://linkedin.com/in/yash-patidar-97a8861b3)
