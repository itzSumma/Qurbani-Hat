"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-300">Something went wrong</p>
        <h1 className="mt-4 text-5xl font-black text-white">Error</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">{error?.message || "An unexpected error occurred."}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
