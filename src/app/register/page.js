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
import { useRouter } from "next/navigation";

const inputStyles =
  "h-12 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    console.log({ data, error });

    if (!error) {
      router.push("/");
    }
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />
      <div className="absolute left-1/2 top-10 -z-10 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-emerald-400/10 bg-slate-950/50 p-8 shadow-xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">
            QurbaniHat
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            Create your buyer account
          </h1>

          <p className="mt-5 text-slate-300">
            Sign up once, explore premium cows and goats, and book faster
            during Qurbani season.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase text-emerald-200">Easy Setup</p>
              <p className="mt-2 text-sm text-slate-300">
                Enter your details and get started instantly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase text-emerald-200">
                Fast Booking
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Browse and book animals without hassle.
              </p>
            </div>
          </div>
        </div>

        <Card className="mx-auto w-full max-w-[520px] rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 px-8 py-6">
            <p className="text-xs uppercase text-emerald-200">Registration</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Sign Up</h2>
          </div>

          <Form className="flex flex-col gap-4 px-8 py-8" onSubmit={onSubmit}>
            <TextField isRequired name="name" className="w-full">
              <Label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </Label>
              <Input className={inputStyles} placeholder="John Doe" />
              <FieldError />
            </TextField>

            <TextField isRequired name="image" className="w-full">
              <Label className="mb-2 block text-sm font-medium text-slate-300">
                Profile Image URL
              </Label>
              <Input
                className={inputStyles}
                placeholder="https://image-url.com"
              />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Invalid email address";
                }
                return null;
              }}
            >
              <Label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </Label>
              <Input className={inputStyles} placeholder="you@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) return "Minimum 8 characters required";
                if (!/[A-Z]/.test(value))
                  return "Add at least 1 uppercase letter";
                if (!/[0-9]/.test(value)) return "Add at least 1 number";
                return null;
              }}
            >
              <Label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </Label>
              <Input className={inputStyles} placeholder="Enter password" />
              <Description className="pt-1 text-xs text-slate-500">
                Must include uppercase and number
              </Description>
              <FieldError />
            </TextField>

            <div className="mt-1 flex flex-col gap-2.5 sm:flex-row">
              <Button
                type="submit"
                className="h-11 flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.02]"
              >
                <Check />
                Create Account
              </Button>

              <Button
                type="reset"
                variant="bordered"
                className="h-11 flex-1 rounded-xl border-white/20 px-4 text-sm text-white hover:bg-white/10"
              >
                Reset
              </Button>
            </div>
          </Form>

          <p className="pb-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Login
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
}
