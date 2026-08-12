"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function AdminAlbums() {
  const [form, setForm] = useState({ title: "", artist: "", releaseYear: "" });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data ?? err.message ?? "Upload failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upload album</h1>
        <Link to="/admin" className="text-sm text-emerald-400 hover:underline">
          ← Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-zinc-900 p-6">
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
