"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/my-profile";
  const { user, login, isReady } = useAuth();
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (isReady && user) {
      router.replace(nextPath);
    }
  }, [isReady, user, router, nextPath]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
    router.push(nextPath);
  };

  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] md:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
          Demo Access
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Login</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Use this simple demo login to unlock booking and profile features.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
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
            placeholder="Address"
            rows={4}
            required
            className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Need an account page too? Visit{" "}
          <Link href="/register" className="text-emerald-300 hover:text-emerald-200">
            Register
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
