import SectionHeader from "./SectionHeader";

const tips = [
  {
    title: "Health First",
    description:
      "Choose active animals with clear eyes, healthy skin, and a confident standing posture before booking.",
  },
  {
    title: "Check Weight and Breed",
    description:
      "Compare breed, age, and approximate weight together so the price feels fair and the animal matches your family plan.",
  },
  {
    title: "Book Early",
    description:
      "Popular animals get reserved quickly before Eid-ul-Adha, so early booking gives you better options and less stress.",
  },
];

const QurbaniTips = () => {
  return (
    <section className="mt-20 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,95,70,0.22),rgba(15,23,42,0.92))] px-6 py-10 shadow-[0_25px_80px_rgba(0,0,0,0.25)] md:px-10">
      <SectionHeader
        eyebrow="Buyer Guide"
        title="Qurbani Tips"
        description="A few practical reminders to help families choose animals with more confidence before placing a booking."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {tips.map((tip, index) => (
          <article
            key={tip.title}
            className="group rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-400/35 hover:bg-slate-950/75 hover:shadow-[0_24px_70px_rgba(16,185,129,0.14)]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-lg font-bold text-emerald-300 transition group-hover:scale-110 group-hover:bg-emerald-500/25 group-hover:text-emerald-200">
              0{index + 1}
            </div>

            <h3 className="text-xl font-semibold text-white transition group-hover:text-emerald-100">
              {tip.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 transition group-hover:text-slate-200">
              {tip.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default QurbaniTips;
