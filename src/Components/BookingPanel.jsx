"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const BookingPanel = ({ animal }) => {
  const pathname = usePathname();
  const { user, isReady } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(initialState);
    setToast(`Booking request for ${animal.name} submitted successfully.`);
    window.setTimeout(() => setToast(""), 3000);
  };

  if (!isReady) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 md:p-8">
        <p className="text-sm text-slate-300">Checking login status...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-200">
          Login Required
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white">Book this animal</h2>
        <p className="mt-3 text-sm leading-7 text-slate-200">
          You need to log in before submitting a booking request for this
          animal.
        </p>
        <Link
          href={`/login?next=${encodeURIComponent(pathname)}`}
          className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 font-semibold text-[#052e2b] transition hover:bg-emerald-400"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] md:p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
          Booking Form
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white">
          Reserve {animal.name}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Fill in your contact details. This demo form resets after submit and
          only shows a success message.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full address"
          required
          rows={4}
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />

        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Confirm Booking
        </button>
      </form>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-emerald-400/20 bg-emerald-500 px-5 py-3 text-sm font-medium text-[#052e2b] shadow-xl">
          {toast}
        </div>
      ) : null}
    </div>
  );
};

export default BookingPanel;
