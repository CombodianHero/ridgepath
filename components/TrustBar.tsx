const names = ["Norwalk Institute", "Aster University", "Brightline Co.", "Fieldstone Labs", "Kepler Academy"];

export default function TrustBar() {
  return (
    <section className="py-8 border-y border-slate-200/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-6">
        <span className="text-xs font-body font-semibold uppercase tracking-wider text-slate-400">Trusted by learners from</span>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {names.map((n) => (
            <span key={n} className="text-sm font-display font-bold text-slate-400 dark:text-slate-600">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
