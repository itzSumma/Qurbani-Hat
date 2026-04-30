import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingPanel from "@/Components/BookingPanel";
import { getAnimalById, getAnimals } from "@/lib/animals";

export async function generateStaticParams() {
  const animals = await getAnimals();

  return animals.map((animal) => ({
    id: String(animal.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    return {
      title: "Animal Not Found | QurbaniHat",
    };
  }

  return {
    title: `${animal.name} | QurbaniHat`,
    description: animal.description,
  };
}

export default async function AnimalDetailsPage({ params }) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return (
    <section className="space-y-8 py-4">
      <Link
        href="/animals"
        className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-emerald-300"
      >
        Back to Animals
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60">
          <div className="relative h-[320px] w-full md:h-[460px]">
            <Image
              src={animal.image}
              alt={animal.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] md:p-8">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {animal.type}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            {animal.name}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-300">
            {animal.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-slate-400">Breed</p>
              <p className="mt-1 font-semibold text-white">{animal.breed}</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-slate-400">Location</p>
              <p className="mt-1 font-semibold text-white">{animal.location}</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-slate-400">Weight</p>
              <p className="mt-1 font-semibold text-white">{animal.weight} kg</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-slate-400">Age</p>
              <p className="mt-1 font-semibold text-white">{animal.age} year</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-slate-400">Health</p>
              <p className="mt-1 font-semibold text-white">
                {animal.healthStatus || "Healthy"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-slate-400">Price</p>
              <p className="mt-1 font-semibold text-emerald-300">
                BDT {animal.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingPanel animal={animal} />
    </section>
  );
}
