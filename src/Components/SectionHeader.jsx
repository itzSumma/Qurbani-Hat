const SectionHeader = ({ eyebrow, title, description, align = "center" }) => {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div
      className={`animate__animated animate__fadeInUp mb-8 flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow ? (
        <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          {eyebrow}
        </span>
      ) : null}

      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeader;
