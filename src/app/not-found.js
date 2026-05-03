import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Page Not Found</p>
        <h1 className="mt-4 text-6xl font-black text-white">404</h1>
        <p className="mt-4 text-lg text-slate-300">
          We couldn&apos;t find the page you were looking for. Maybe the link is broken, or the item has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
