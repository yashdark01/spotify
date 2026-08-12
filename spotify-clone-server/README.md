# Spotify Clone — Server

Express + MongoDB API for the Music Player streaming app.

## Stack

- Node.js, Express 4
- MongoDB + Mongoose
- Clerk Express SDK (JWT auth)
- Cloudinary (admin media uploads)
- express-fileupload

## Run locally

```bash
cp .env.example .env
# Fill MONGODB_URI, CLERK_*, CLOUDINARY_*, ADMIN_EMAIL
npm install
npm run dev
```

API: **http://localhost:3001/api**

## Seed database

```bash
npm run seed
```

Inserts 14 demo songs and 4 albums (uses static asset paths from the client `public/` folder).

## Environment

See `.env.example` for all variables.

| Variable | Required |
|----------|----------|
| `MONGODB_URI` | yes |
| `CLERK_SECRET_KEY` | yes |
| `CLERK_PUBLISHABLE_KEY` | yes |
| `ADMIN_EMAIL` | yes (for admin routes) |
| `CLOUDINARY_*` | yes (for admin uploads) |

## Scripts

```bash
npm run dev   # nodemon src/index.js
npm run seed  # node src/server.js
```

## API routes

| Prefix | File |
|--------|------|
| `/api/auth` | `routes/auth.route.js` |
| `/api/songs` | `routes/songs.route.js` |
| `/api/albums` | `routes/albums.route.js` |
| `/api/user` | `routes/user.route.js` |
| `/api/admin` | `routes/admin.route.js` |
| `/api/stats` | `routes/stats.route.js` |

Full API reference: [../docs/API.md](../docs/API.md)
