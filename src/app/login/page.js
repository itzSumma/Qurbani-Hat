"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import { toast } from "react-toastify";

const inputStyles =
  "h-12 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const nextPath = searchParams.get("next") || "/my-profile";

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: nextPath,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      const message =
        error.message || "Login failed. Please check your credentials.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setErrorMessage("");
    toast.success("Login successful! Redirecting…");
    setTimeout(() => router.push(nextPath), 700);
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-16">

      {/* background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />
      <div className="absolute left-1/2 top-10 -z-10 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">

        {/* LEFT */}
        <div className="animate__animated animate__fadeInLeft rounded-3xl border border-emerald-400/10 bg-slate-950/50 p-8 shadow-xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:shadow-[0_30px_80px_rgba(16,185,129,0.12)]">

          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">
            QurbaniHat
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            Welcome Back
          </h1>

          <p className="mt-5 text-slate-300">
            Sign in to access your dashboard, track your livestock bookings, and
            manage your profile securely.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-400/35 hover:bg-white/10 hover:shadow-[0_24px_70px_rgba(16,185,129,0.14)]">
              <p className="text-xs uppercase text-emerald-200 transition group-hover:text-emerald-100">
                Secure Access
              </p>
              <p className="mt-2 text-sm text-slate-300 transition group-hover:text-slate-200">
                Your data is protected with high-level encryption.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-400/35 hover:bg-white/10 hover:shadow-[0_24px_70px_rgba(16,185,129,0.14)]">
              <p className="text-xs uppercase text-emerald-200 transition group-hover:text-emerald-100">
                Sync Everywhere
              </p>
              <p className="mt-2 text-sm text-slate-300 transition group-hover:text-slate-200">
                Access your account from any device at any time.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT CARD */}
        <Card className="animate__animated animate__fadeInUp mx-auto w-full max-w-[520px] rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-emerald-400/30 hover:shadow-[0_30px_90px_rgba(16,185,129,0.12)]">

          <div className="border-b border-white/10 px-8 py-6">
            <p className="text-xs uppercase text-emerald-200">
              Authentication
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Sign In
            </h2>
          </div>

          <Form className="flex flex-col gap-4 px-8 py-8" onSubmit={onSubmit}>

            <TextField isRequired name="email" type="email">
              <Label className="mb-2 block text-sm text-slate-300">
                Email
              </Label>
              <Input className={inputStyles} placeholder="you@example.com" />
              <FieldError />
            </TextField>

            <TextField isRequired name="password" type="password">
              <Label className="mb-2 block text-sm text-slate-300">
                Password
              </Label>
              <Input className={inputStyles} placeholder="Enter password" />
              <Description className="pt-1 text-xs text-slate-500">
                Must include uppercase and number
              </Description>
              <FieldError />
            </TextField>

            {errorMessage && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <div className="flex flex-col gap-2.5 sm:flex-row">

              <Button
                type="submit"
                className="h-11 flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 text-sm font-semibold text-black shadow-lg transition duration-300 hover:scale-[1.04] hover:shadow-[0_15px_35px_rgba(16,185,129,0.35)]"
              >
                <Check className="w-4 h-4" />
                Sign In
              </Button>

              <Button
                type="reset"
                variant="bordered"
                className="h-11 flex-1 rounded-xl border-white/20 px-4 text-sm text-white transition duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5"
              >
                Reset
              </Button>

            </div>
          </Form>

          {/* Google */}
          <div className="px-8 pb-6">
            <div className="relative mb-6 flex items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="mx-4 text-xs uppercase text-slate-500">
                Or
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="bordered"
              className="h-11 w-full flex items-center justify-center gap-2 rounded-xl border-white/20 text-sm text-white transition duration-300 hover:bg-white/10 hover:shadow-[0_8px_25px_rgba(255,255,255,0.1)]"
            >
              <GrGoogle className="w-4 h-4" />
              Sign In with Google
            </Button>
          </div>

          <p className="pb-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-400 transition hover:text-emerald-200 hover:underline"
            >
              Register
            </Link>
          </p>

        </Card>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading authentication...</div>}>
      <LoginContent />
    </Suspense>
  );
}