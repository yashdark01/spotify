# Music Player — Fix Plan

Audit of breakable functionality in client and server, with a phased fix roadmap.

**Status:** Implemented (Phases 1–4) — Aug 2026  
**Last reviewed:** Aug 2026

---

## Executive summary

| Severity | Count | Blocks core app? |
|----------|-------|------------------|
| **Critical** | 4 | Yes — auth, admin CRUD, health |
| **High** | 5 | Partial — admin UI missing, fetch bugs |
| **Medium** | 6 | UX / production readiness |
| **Low** | 4 | Polish |

**Recommended order:** Phase 1 → 2 → 3 → 4

---

## Phase 1 — Critical (auth & server bugs)

*Est. 2–4 hours · Unblocks login → browse → play*

### 1.1 Global auth middleware blocks public routes

**File:** `server/src/index.js`

**Problem:** Lines 32–44 require Clerk auth on **every** request, including `GET /api` health check and potential races with `/api/auth/callback`.

**Fix:**
- Remove global auth middleware block
- Rely on `protectRoute` per router (already on songs, albums, user, admin)
- Keep `clerkMiddleware()` only

---

### 1.2 `deleteSong` / `deleteAlbum` never delete

**File:** `server/src/controller/admin.controller.js`

**Problem:** `await song.findByIdAndDelete(id)` — instance method, not Model.

**Fix:** `await Song.findByIdAndDelete(id)` and `await Album.findByIdAndDelete(id)`.

---

### 1.3 `createAlbum` file field mismatch

**Problem:** Validates `imageFiles` but reads `imageFile`.

**Fix:** Use consistent `imageFile` field name in validation and upload.

---

### 1.4 `createSong` duplicate album push

**Problem:** `$push` via `findByIdAndUpdate` then manual `album.songs.push` + `save()`.

**Fix:** Use only `findByIdAndUpdate` with `$push`.

---

## Phase 2 — High (client routes & data fetching)

*Est. 4–6 hours*

### 2.1 Admin dashboard route missing

**Problem:** `Header.jsx` links to `/admin` but `App.jsx` has no route → 404.

**Fix:** Add admin pages (dashboard, song upload, album upload) + routes guarded by `isAdmin`.

---

### 2.2 HomePage fetch logic broken

**File:** `client/src/pages/home/HomePage.jsx`

**Problem:** Both effects gate on `madeForYouSongs.length`; trending never fetches correctly.

**Fix:** Separate guards — `madeForYouSongs.length` vs `trendingSongs.length`.

---

### 2.3 Hardcoded API URL

**File:** `client/src/lib/axios.jsx`

**Fix:** `import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'`

---

### 2.4 CORS single origin

**Fix:** `CLIENT_URL` env var supporting multiple origins for production.

---

## Phase 3 — Medium (playback, albums, UX)

*Est. 4–6 hours*

- Album page empty/error states (not infinite skeleton)
- Document seeded audio paths vs Cloudinary URLs
- LeftSidebar ScrollArea — use shadcn wrapper consistently
- Chat page: label as demo or wire Socket.io (dependency unused)
- Remove dead imports (`use` in HomePage, debug logs)

---

## Phase 4 — Low (production & polish)

*Est. 3–5 hours*

- Startup env validation (MONGODB_URI, CLERK keys)
- Deploy docs for Vercel + Railway/Render
- Optional tests (supertest + Vitest)
- Rename `spotify.png` → `music-player.png`

---

## Verification checklist

| Flow | Expected |
|------|----------|
| Sign in with Clerk | Home loads, user in MongoDB |
| Home | Featured + Made for You + Trending |
| Play song | Audio, queue, next/prev |
| Album page | Song list + play album |
| Admin upload/delete | Cloudinary + DB sync |
| `GET /api` | 200 without auth |

---

## Suggested PRs

| PR | Scope |
|----|--------|
| **PR 1** | Phase 1 — server fixes |
| **PR 2** | Phase 2 — client admin + fetch + env |
| **PR 3** | Phase 3 — UX cleanup |
| **PR 4** | Phase 4 — deploy + tests |
