import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="animate__animated animate__fadeIn relative flex min-h-[80vh] items-center overflow-hidden rounded-3xl border border-emerald-900/40 bg-[#031310] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <Image
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
        alt="Healthy livestock field"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_40%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-14 md:px-10 lg:flex-row lg:items-center lg:px-14">
        <div className="animate__animated animate__fadeInUp max-w-3xl text-center lg:text-left">
          <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Trusted Qurbani Marketplace
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Book healthy cattle & goats for{" "}
            <span className="text-[#065f46]">Qurbani</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base md:text-lg">
            Explore verified animals from trusted farmers. Compare breed,
            weight and price, then book instantly in minutes.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/animals"
              className="rounded-full bg-[#10b981] px-7 py-3 text-center font-semibold text-[#052e2b] transition hover:bg-[#34d399]"
            >
              Browse Animals
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-white/30 px-7 py-3 text-center font-semibold text-white transition hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
          <div
            className="animate__animated animate__fadeInRight rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md"
            style={{ animationDelay: "120ms", animationFillMode: "both" }}
          >
            <p className="text-sm text-emerald-200">Featured Types</p>
            <p className="mt-2 text-xl font-semibold text-white">
              Cows and Goats
            </p>
          </div>

          <div
            className="animate__animated animate__fadeInRight rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md"
            style={{ animationDelay: "220ms", animationFillMode: "both" }}
          >
            <p className="text-sm text-emerald-200">Details</p>
            <p className="mt-2 text-xl font-semibold text-white">
              Breed, Weight, Location
            </p>
          </div>

          <div
            className="animate__animated animate__fadeInRight rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md"
            style={{ animationDelay: "320ms", animationFillMode: "both" }}
          >
            <p className="text-sm text-emerald-200">Booking</p>
            <p className="mt-2 text-xl font-semibold text-white">
              Fast and Secure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
