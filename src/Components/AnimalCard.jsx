import Image from "next/image";
import Link from "next/link";

const AnimalCard = ({ animal }) => {
  if (!animal) return null;

  return (
    <article className="group relative rounded-2xl bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-emerald-500/30 p-[1px] transition hover:from-emerald-400 hover:via-cyan-400 hover:to-emerald-400">
      <div className="h-full overflow-hidden rounded-2xl bg-[#0b1220] shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={animal.image}
            alt={animal.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              {animal.type}
            </span>
            <span className="rounded-full bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-black">
              Star {animal.rating || 4.5}
            </span>
          </div>

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Available
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h2 className="text-lg font-bold text-white transition group-hover:text-emerald-300">
              {animal.name}
            </h2>
            <p className="text-sm text-slate-400">
              {animal.breed} | {animal.location}
            </p>
          </div>

          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
            Health: {animal.healthStatus || "Healthy"}
          </span>

          <p className="line-clamp-2 text-sm text-slate-400">
            {animal.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <p className="text-lg font-bold text-emerald-400">
              BDT {animal.price.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">
              {animal.weight}kg | {animal.age}yr
            </p>
          </div>

          <Link
            href={`/animals/${animal.id}`}
            className="mt-3 block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2 text-center font-semibold text-black transition hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AnimalCard;
