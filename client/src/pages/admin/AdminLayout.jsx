"use client";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "@/components/Header";
import { Loader } from "lucide-react";

export default function AdminLayout() {
  const { isAdmin, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900">
        <Loader className="size-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Header />
      <main className="mx-auto max-w-4xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
