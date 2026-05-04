"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { user, isReady, hasSession, updateProfile, refetchSession } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [status, setStatus] = useState({ message: "", error: "", saving: false });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "", error: "", saving: true });

    try {
      if (hasSession) {
        const payload = {
          name: formData.name,
          image: formData.image,
        };
        const { data, error } = await authClient.updateUser(payload);

        if (error) {
          setStatus({ message: "", error: error.message || "Unable to update profile.", saving: false });
          return;
        }

        await refetchSession?.();
      } else {
        updateProfile(formData);
      }

      setIsOpen(false);
      setStatus({ message: "Profile updated successfully.", error: "", saving: false });
    } catch (error) {
      setStatus({ message: "", error: "Something went wrong while updating.", saving: false });
    }
  };

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
          <a
            href="/login?next=/my-profile"
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 font-semibold text-[#052e2b] transition hover:bg-emerald-400"
          >
            Go to Login
          </a>
        </div>
      </section>
    );
  }

  const avatarLetter = user.name?.trim()?.[0]?.toUpperCase() || "U";

  return (
    <section className="mx-auto max-w-4xl py-10">
      <div className="animate__animated animate__fadeIn space-y-8">
        {/* Profile Header Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />

          <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-75 blur transition duration-500 group-hover:opacity-100" />
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-slate-950 bg-slate-900 md:h-40 md:w-40">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-5xl font-black text-emerald-400">
                    {avatarLetter}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
                    Account Overview
                  </p>
                  <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">
                    {user.name || "User Profile"}
                  </h1>
                  <p className="mt-3 text-lg text-slate-300">
                    {user.email || "Active Member"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 text-sm font-bold text-black shadow-lg transition hover:scale-105 hover:opacity-90 active:scale-95"
                >
                  Edit Profile
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-slate-400">
                  <span className="text-emerald-300">ID:</span> {user.id || "N/A"}
                </div>
                {user.phone && (
                  <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-slate-400">
                    <span className="text-emerald-300">Phone:</span> {user.phone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 transition hover:border-emerald-500/30">
            <h3 className="text-sm uppercase tracking-widest text-emerald-200">
              Personal Information
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs text-slate-500 uppercase">Display Name</p>
                <p className="mt-1 text-lg font-medium text-white">{user.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">Email Address</p>
                <p className="mt-1 text-lg font-medium text-white">{user.email || "—"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 transition hover:border-cyan-500/30">
            <h3 className="text-sm uppercase tracking-widest text-cyan-200">
              Contact & Shipping
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs text-slate-500 uppercase">Phone Number</p>
                <p className="mt-1 text-lg font-medium text-white">{user.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">Primary Address</p>
                <p className="mt-1 text-lg font-medium text-white line-clamp-2">{user.address || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image URL Display */}
        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8">
          <p className="text-xs uppercase tracking-widest text-slate-500">Avatar Source</p>
          <p className="mt-2 truncate font-mono text-sm text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-white/5">
            {user.image || "Default generated avatar"}
          </p>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="absolute inset-0 bg-slate-950/60" onClick={() => setIsOpen(false)} />
            <div className="animate__animated animate__zoomIn relative w-full max-w-xl rounded-[2.5rem] border border-white/10 bg-slate-900 p-8 shadow-2xl md:p-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-white">Edit Profile</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-emerald-500/50"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Avatar URL</label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-emerald-500/50"
                    placeholder="https://images.com/avatar.jpg"
                  />
                </div>

                {status.error && (
                  <div className="rounded-xl bg-rose-500/10 p-4 text-sm text-rose-400 border border-rose-500/20">
                    {status.error}
                  </div>
                )}
                
                {status.message && (
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-400 border border-emerald-500/20">
                    {status.message}
                  </div>
                )}

                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-full border border-white/10 py-4 text-sm font-bold text-white transition hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status.saving}
                    className="flex-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-4 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
                  >
                    {status.saving ? "Processing..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
