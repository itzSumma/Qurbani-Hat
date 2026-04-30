"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return <div className="py-6 text-slate-300">Loading profile...</div>;
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-2xl py-6">
        <div className="rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">
            Login Required
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">My Profile</h1>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Please log in first to view your profile details.
          </p>
          <Link
            href="/login?next=/my-profile"
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 font-semibold text-[#052e2b] transition hover:bg-emerald-400"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl py-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] md:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
          My Profile
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">{user.name}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Your demo login details are available below.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-1 font-semibold text-white">{user.email}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm text-slate-400">Phone</p>
            <p className="mt-1 font-semibold text-white">{user.phone}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 sm:col-span-2">
            <p className="text-sm text-slate-400">Address</p>
            <p className="mt-1 font-semibold text-white">{user.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
