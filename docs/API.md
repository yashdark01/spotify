# API Reference

Base URL (local): `http://localhost:3001/api`

All routes except `/api/auth/callback` (POST) require a valid **Clerk session JWT** in the `Authorization` header:

```
Authorization: Bearer <clerk_session_token>
```

The global middleware in `index.js` validates Clerk auth before route handlers run.

---

## Health

### `GET /api`

Returns plain text health check.

**Response:** `Hello World!`

---

## Auth

### `POST /api/auth/callback`

Syncs Clerk user to MongoDB after first sign-in.

**Body (JSON):**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Clerk user ID |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `imageUrl` | string | Profile image URL |

**Response:**

```json
{ "message": "User created successfully!", "success": true }
```

or

```json
{ "message": "User already exists", "success": true }
```

### `GET /api/auth/callback`

Legacy check endpoint.

**Response:** `{ "user": "valid" }`

---

## Songs

All routes require `protectRoute`.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/songs` | All songs (newest first) |
| `GET` | `/songs/featured` | 6 random songs (`$sample`) |
| `GET` | `/songs/made-for-you` | 4 random songs |
| `GET` | `/songs/trending` | 4 random songs |
| `GET` | `/songs/:id` | Single song by MongoDB ID |

### Song object

```json
{
  "_id": "...",
  "title": "Stay With Me",
  "artist": "Sarah Mitchell",
  "imageUrl": "/cover-images/1.jpg",
  "audioUrl": "/songs/1.mp3",
  "duration": 46,
  "albumId": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Albums

All routes require `protectRoute`.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/albums` | All albums |
| `GET` | `/albums/:id` | Album with populated songs |

### Album object

```json
{
  "_id": "...",
  "title": "Urban Nights",
  "artist": "Various Artists",
  "imageUrl": "/albums/1.jpg",
  "releaseYear": 2024,
  "songs": ["...", "..."],
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Users

All routes require `protectRoute`.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/user` | List all synced users |

---

## Admin

Requires `protectRoute` + `requireAdmin` (email must match `ADMIN_EMAIL`).

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/admin/check` | Verify admin status |
| `POST` | `/admin/songs` | Upload song (multipart) |
| `DELETE` | `/admin/songs/:id` | Delete song |
| `POST` | `/admin/albums` | Upload album cover (multipart) |
| `DELETE` | `/admin/albums/:id` | Delete album + its songs |

### Create song (`POST /admin/songs`)

**Content-Type:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| `title` | string | yes |
| `artist` | string | yes |
| `duration` | number | yes |
| `albumId` | string | no |
| `audioFile` | file | yes |
| `imageFiles` | file | yes |

Files upload to Cloudinary; URLs stored in MongoDB.

### Create album (`POST /admin/albums`)

| Field | Type | Required |
|-------|------|----------|
| `title` | string | yes |
| `artist` | string | yes |
| `releaseYear` | number | yes |
| `imageFile` | file | yes |

---

## Stats

Requires admin.

### `GET /api/stats`

**Response:**

```json
{
  "totalSongs": 14,
  "totalAlbums": 4,
  "totalUsers": 3,
  "totalArtist": 0
}
```

---

## Error responses

| Status | Meaning |
|--------|---------|
| `401` | Missing or invalid Clerk token |
| `403` | Not admin |
| `404` | Resource not found |
| `500` | Server error (message hidden in production) |
