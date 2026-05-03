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
    <section className="mx-auto max-w-3xl py-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">My Profile</p>
            <h1 className="mt-3 text-3xl font-bold text-white">{user.name || "Profile"}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Update your profile information and keep your contact details current.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3">
            {user.image ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-800">
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-black">
                {avatarLetter}
              </div>
            )}
            <div>
              <p className="text-sm text-slate-400">User ID</p>
              <p className="text-lg font-semibold text-white">{user.id || "N/A"}</p>
              <p className="text-sm text-slate-400">Image URL</p>
              <p className="truncate text-slate-200">{user.image || "No image set"}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Profile Details</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Click edit to change your display name and profile image URL.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">User Name</p>
              <p className="mt-2 text-lg font-semibold text-white">{user.name || "Not set"}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Profile Image</p>
              <p className="mt-2 truncate text-slate-200">{user.image || "No image URL"}</p>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Update your display name and the image URL shown on your profile.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <label className="space-y-2 text-sm text-slate-300">
                  Display Name
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                    placeholder="Your display name"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  Profile Image URL
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                    placeholder="https://..."
                  />
                </label>

                {status.error ? (
                  <p className="text-sm text-red-400">{status.error}</p>
                ) : null}
                {status.message ? (
                  <p className="text-sm text-emerald-300">{status.message}</p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-white/10 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status.saving}
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status.saving ? "Saving..." : "Save Changes"}
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
