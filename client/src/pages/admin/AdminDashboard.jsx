"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/stats")
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.error ?? "Failed to load stats"));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage songs, albums, and view platform stats.
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Songs", value: stats.totalSongs },
            { label: "Albums", value: stats.totalAlbums },
            { label: "Users", value: stats.totalUsers },
            { label: "Artists", value: stats.totalArtist },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/admin/songs">Manage songs</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/admin/albums">Manage albums</Link>
        </Button>
      </div>
    </div>
  );
}
