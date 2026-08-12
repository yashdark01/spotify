"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AdminAlbums() {
  const [form, setForm] = useState({ title: "", artist: "", releaseYear: "" });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadAlbums = useCallback(async () => {
    setAlbumsLoading(true);
    try {
      const res = await axiosInstance.get("/albums");
      setAlbums(res.data);
    } catch {
      setAlbums([]);
    } finally {
      setAlbumsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = new FormData();
    data.append("title", form.title);
    data.append("artist", form.artist);
    data.append("releaseYear", form.releaseYear);
    if (imageFile) data.append("imageFile", imageFile);

    try {
      await axiosInstance.post("/admin/albums", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ type: "success", text: "Album uploaded successfully." });
      setForm({ title: "", artist: "", releaseYear: "" });
      setImageFile(null);
      await loadAlbums();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data ?? err.message ?? "Upload failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this album and its linked songs? This cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    setMessage(null);
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      setMessage({ type: "success", text: "Album deleted." });
      await loadAlbums();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data ?? err.message ?? "Delete failed",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage albums</h1>
        <Link to="/admin" className="text-sm text-emerald-400 hover:underline">
          ← Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-zinc-900 p-6">
        <h2 className="text-lg font-semibold">Upload album</h2>
        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
          placeholder="Artist"
          value={form.artist}
          onChange={(e) => setForm({ ...form, artist: e.target.value })}
          required
        />
        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
          placeholder="Release year"
          type="number"
          value={form.releaseYear}
          onChange={(e) => setForm({ ...form, releaseYear: e.target.value })}
          required
        />
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Cover image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading…" : "Upload album"}
        </Button>
      </form>

      <div className="rounded-lg bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-semibold">All albums ({albums.length})</h2>
        {albumsLoading ? (
          <p className="text-sm text-zinc-400">Loading albums…</p>
        ) : albums.length === 0 ? (
          <p className="text-sm text-zinc-400">No albums yet. Upload one or run the seed script.</p>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {albums.map((album) => (
              <li key={album._id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={album.imageUrl}
                    alt=""
                    className="size-10 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{album.title}</p>
                    <p className="truncate text-sm text-zinc-400">
                      {album.artist} · {album.releaseYear}
                    </p>
                    <p className="text-xs text-zinc-500">ID: {album._id}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === album._id}
                  onClick={() => handleDelete(album._id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {message && (
        <p
          className={`text-sm ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
