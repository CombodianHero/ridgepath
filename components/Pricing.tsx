import { CheckCircle2 } from "lucide-react";
import { palette } from "@/lib/tokens";
import Pill from "./Pill";

type Plan = { name: string; price: string; desc: string; features: string[]; highlight?: boolean };

const plans: Plan[] = [
  { name: "Starter", price: "Free", desc: "Explore the catalog", features: ["3 courses at a time", "Community access", "Basic progress tracking"] },
  {
    name: "Growth",
    price: "$24",
    desc: "For committed learners",
    features: ["Unlimited courses", "AI assistant included", "Certificates + verification", "Live class access"],
    highlight: true,
  },
  {
    name: "Teams",
    price: "Custom",
    desc: "For organizations",
    features: ["Everything in Growth", "Admin dashboard", "Usage analytics", "Dedicated support"],
  },
];

export default function Pricing() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Simple pricing, no surprises</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 font-body">Start free. Upgrade when the path gets serious.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-6 border transition-all ${
              p.highlight
                ? "text-white shadow-2xl shadow-blue-600/30 scale-[1.03] border-transparent"
                : "bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border-white/40 dark:border-white/10"
            }`}
            style={p.highlight ? { background: `linear-gradient(160deg, ${palette.blue}, ${palette.indigo} 60%, ${palette.purple})` } : {}}
          >
            {p.highlight && (
              <Pill tone="blue">
                <span className="text-white">Most popular</span>
              </Pill>
            )}
            <h3 className={`font-display font-bold text-lg mt-3 ${p.highlight ? "text-white" : "text-slate-900 dark:text-white"}`}>{p.name}</h3>
            <p className={`text-sm font-body mt-1 ${p.highlight ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>{p.desc}</p>
            <div className={`font-display font-extrabold text-3xl mt-4 ${p.highlight ? "text-white" : "text-slate-900 dark:text-white"}`}>
              {p.price}
              {p.price !== "Free" && p.price !== "Custom" && <span className="text-base font-medium">/mo</span>}
            </div>
            <ul className="mt-5 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className={`flex items-center gap-2 text-sm font-body ${p.highlight ? "text-blue-50" : "text-slate-600 dark:text-slate-300"}`}>
                  <CheckCircle2 size={15} className={p.highlight ? "text-white" : "text-blue-500"} /> {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-6 py-2.5 rounded-full text-sm font-semibold font-body transition-colors ${
                p.highlight ? "bg-white text-blue-700 hover:bg-blue-50" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
              }`}
            >
              {p.price === "Custom" ? "Contact sales" : "Choose plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
