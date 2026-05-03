"use client";
import Link from "next/link";
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

const inputStyles =
  "h-12 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40";

export default function LoginPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    console.log({ data, error });
  };

  const handlGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Background Ornaments */}
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />
      <div className="absolute left-1/2 top-10 -z-10 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        {/* Branding Section */}
        <div className="animate__animated animate__fadeInLeft rounded-3xl border border-emerald-400/10 bg-slate-950/50 p-8 shadow-xl backdrop-blur">
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
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase text-emerald-200">
                Secure Access
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Your data is protected with high-level encryption.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase text-emerald-200">
                Sync Everywhere
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Access your account from any device at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="animate__animated animate__fadeInUp mx-auto w-full max-w-[520px] rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 px-8 py-6">
            <p className="text-xs uppercase text-emerald-200">Authentication</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Sign In</h2>
          </div>

          <Form className="flex flex-col gap-4 px-8 py-8" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}>
              <Label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </Label>
              <Input className={inputStyles} placeholder="john@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8)
                  return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value))
                  return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Password must contain at least one number";
                return null;
              }}>
              <Label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </Label>
              <Input
                className={inputStyles}
                placeholder="Enter your password"
              />
              <Description className="pt-1 text-xs text-slate-500">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>

            <div className="mt-1 flex flex-col gap-2.5 sm:flex-row">
              <Button
                type="submit"
                className="h-11 flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.02]">
                <Check />
                Sign In
              </Button>
              <Button
                type="reset"
                variant="bordered"
                className="h-11 flex-1 rounded-xl border-white/20 px-4 text-sm text-white hover:bg-white/10">
                Reset
              </Button>
            </div>
          </Form>

          <div className="px-8 pb-6">
            <div className="relative mb-6 flex items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="mx-4 flex-shrink text-xs uppercase text-slate-500">
                Or
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <Button
              onClick={handlGoogleSignIn}
              variant="bordered"
              className="h-11 w-full rounded-xl border-white/20 text-sm text-white hover:bg-white/10 items-center">
              <GrGoogle /> Sign In With Google
            </Button>
          </div>

          <p className="pb-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-300 hover:text-emerald-200">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
}
