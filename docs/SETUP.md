# Setup Guide

Step-by-step instructions to run the Music Player app locally.

---

## 1. Prerequisites

| Requirement | Notes |
|-------------|-------|
| **Node.js** | v18 or newer |
| **npm** | Comes with Node |
| **MongoDB** | [MongoDB Atlas](https://www.mongodb.com/atlas) free tier works |
| **Clerk** | Free tier at [clerk.com](https://clerk.com) |
| **Cloudinary** | Free tier for admin media uploads |

---

## 2. Clerk configuration

1. Create a Clerk application.
2. Enable sign-in methods you want (Google, email, etc.).
3. Copy **Publishable key** and **Secret key**.

### Redirect URLs (Clerk Dashboard → Paths)

| Path | Purpose |
|------|---------|
| `http://localhost:3000` | App URL |
| `http://localhost:3000/sso-callback` | OAuth callback |
| `http://localhost:3000/auth-callback` | Post-auth user sync |

The client uses:
- `/sso-callback` → `AuthenticateWithRedirectCallback`
- `/auth-callback` → syncs user to MongoDB via `POST /api/auth/callback`

---

## 3. MongoDB

1. Create a cluster on MongoDB Atlas.
2. Add a database user with read/write access.
3. Allow your IP (or `0.0.0.0/0` for local dev only).
4. Copy the connection string:

```
mongodb+srv://<user>:<password>@cluster.mongodb.net/music-player?retryWrites=true&w=majority
```

Set as `MONGODB_URI` in `music-player-clone-server/.env`.

---

## 4. Cloudinary (admin uploads)

1. Create a Cloudinary account.
2. Dashboard → copy **Cloud name**, **API key**, **API secret**.
3. Add to server `.env`:

```
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Admin uploads land in folder `music-player/` on Cloudinary.

---

## 5. Server setup

```bash
cd music-player-clone-server
cp .env.example .env
```

Edit `.env`:

```env
PORT=3001
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=your-admin@email.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NODE_ENV=development
```

Install and run:

```bash
npm install
npm run dev
```

Verify: open **http://localhost:3001/api** — should return `Hello World!`

### Seed demo data

```bash
npm run seed
```

This clears existing songs/albums and inserts 14 tracks + 4 albums referencing client static assets (`/songs/*.mp3`, `/cover-images/*.jpg`).

---

## 6. Client setup

```bash
cd music-player-clone-client
cp .env.example .env
```

Edit `.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Install and run:

```bash
npm install
npm run dev
```

Open **http://localhost:3000**, sign in with Clerk, and browse music.

---

## 7. CORS

The server allows:

```js
origin: 'http://localhost:3000'
```

For production, update `cors` in `music-player-clone-server/src/index.js` to your deployed frontend URL and set the client `axiosInstance` base URL in `src/lib/axios.jsx`.

---

## 8. Admin access

Set `ADMIN_EMAIL` in server `.env` to the Clerk account email you use to sign in. Admin routes (`/api/admin/*`, `/api/stats`) require this email match via `requireAdmin` middleware.

---

## 9. Troubleshooting

| Issue | Fix |
|-------|-----|
| `401 Unauthorized` on API | Sign in via Clerk; check Bearer token in Network tab |
| `MONGODB_URI is not defined` | Add URI to server `.env` and restart |
| Clerk key error on client | Set `VITE_CLERK_PUBLISHABLE_KEY` in client `.env` |
| No songs on home | Run `npm run seed` in server folder |
| CORS error | Ensure server runs on 3001, client on 3000, CORS origin matches |
| Admin upload fails | Verify Cloudinary credentials and file size under 12 MB |

---

## 10. Production deployment (outline)

| App | Suggested platform |
|-----|-------------------|
| Client | Vercel, Netlify |
| Server | Railway, Render, Fly.io |
| Database | MongoDB Atlas |
| Auth | Clerk production keys |
| Media | Cloudinary |

Update:
- Client `axiosInstance.baseURL` → production API URL
- Server CORS `origin` → production frontend URL
- Clerk allowed origins and redirect URLs
