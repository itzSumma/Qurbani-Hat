import { getTopBreeds } from "@/lib/animals";
import SectionHeader from "./SectionHeader";

const TopBreeds = async () => {
  const breeds = await getTopBreeds(4);

  return (
    <section className="mt-20">
      <SectionHeader
        eyebrow="Popular Picks"
        title="Top Breeds"
        description="These high-demand breeds stand out for strong build, trusted quality, and strong buyer interest."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {breeds.map((breed) => (
          <article
            key={breed.id}
            className="group rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-2 hover:border-emerald-400/35 hover:bg-slate-950/80 hover:shadow-[0_28px_80px_rgba(16,185,129,0.16)]"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300 transition group-hover:text-emerald-200">
              {breed.type}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white transition group-hover:text-emerald-100">
              {breed.breed}
            </h3>
            <p className="mt-2 text-sm text-slate-300 transition group-hover:text-slate-200">
              {breed.location}
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition group-hover:border-emerald-400/20 group-hover:bg-white/5">
                <span>Weight</span>
                <span className="font-semibold text-white">{breed.weight} kg</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition group-hover:border-emerald-400/20 group-hover:bg-white/5">
                <span>Price</span>
                <span className="font-semibold text-emerald-300 transition group-hover:text-emerald-200">
                  BDT {breed.price.toLocaleString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TopBreeds;
