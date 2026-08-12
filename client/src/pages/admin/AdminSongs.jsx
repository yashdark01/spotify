"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AdminSongs() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    duration: "",
    albumId: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [songsLoading, setSongsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadSongs = useCallback(async () => {
    setSongsLoading(true);
    try {
      const res = await axiosInstance.get("/songs");
      setSongs(res.data);
    } catch {
      setSongs([]);
    } finally {
      setSongsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = new FormData();
    data.append("title", form.title);
    data.append("artist", form.artist);
    data.append("duration", form.duration);
    if (form.albumId) data.append("albumId", form.albumId);
    if (audioFile) data.append("audioFile", audioFile);
    if (imageFile) data.append("imageFile", imageFile);

    try {
      await axiosInstance.post("/admin/songs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ type: "success", text: "Song uploaded successfully." });
      setForm({ title: "", artist: "", duration: "", albumId: "" });
      setAudioFile(null);
      setImageFile(null);
      await loadSongs();
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
    if (!window.confirm("Delete this song? This cannot be undone.")) return;

    setDeletingId(id);
    setMessage(null);
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      setMessage({ type: "success", text: "Song deleted." });
      await loadSongs();
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
        <h1 className="text-2xl font-bold">Manage songs</h1>
        <Link to="/admin" className="text-sm text-emerald-400 hover:underline">
          ← Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-zinc-900 p-6">
        <h2 className="text-lg font-semibold">Upload song</h2>
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
          placeholder="Duration (seconds)"
          type="number"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />
        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
          placeholder="Album ID (optional)"
          value={form.albumId}
          onChange={(e) => setForm({ ...form, albumId: e.target.value })}
        />
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Audio file</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
            required
          />
        </div>
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
          {loading ? "Uploading…" : "Upload song"}
        </Button>
      </form>

      <div className="rounded-lg bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-semibold">All songs ({songs.length})</h2>
        {songsLoading ? (
          <p className="text-sm text-zinc-400">Loading songs…</p>
        ) : songs.length === 0 ? (
          <p className="text-sm text-zinc-400">No songs yet. Upload one or run the seed script.</p>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {songs.map((song) => (
              <li key={song._id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={song.imageUrl}
                    alt=""
                    className="size-10 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{song.title}</p>
                    <p className="truncate text-sm text-zinc-400">{song.artist}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === song._id}
                  onClick={() => handleDelete(song._id)}
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
