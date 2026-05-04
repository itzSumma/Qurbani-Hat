"use client";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950">
      
      {/* Spinner */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-sm tracking-widest text-slate-400 animate-pulse">
        Loading QurbaniHat...
      </p>
    </div>
  );
}