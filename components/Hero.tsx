import { ArrowRight, Play, Sparkles } from "lucide-react";
import { palette } from "@/lib/tokens";
import GlassCard from "./GlassCard";
import Pill from "./Pill";
import LearningPath from "./LearningPath";

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10 sm:pt-24 sm:pb-16">
      <div
        className="absolute -top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${palette.purple}, transparent 70%)` }}
      />
      <div
        className="absolute top-40 -left-40 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 dark:opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${palette.blue}, transparent 70%)` }}
      />

      <div className="relative grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold font-body mb-6">
            <Sparkles size={13} /> AI-guided learning paths
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight text-slate-900 dark:text-white">
            Learn like the path
            <br />
            was{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${palette.blue}, ${palette.purple})`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              built for you.
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 font-body max-w-md leading-relaxed">
            Ridgepath maps every course into a personal roadmap — showing exactly what you've mastered, what's next, and how close you are to certified.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold font-body shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all bg-gradient-to-br from-brand-blue to-brand-indigo">
              Start learning free <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold font-body text-slate-700 dark:text-slate-200 border border-slate-300/70 dark:border-white/15 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors">
              <Play size={15} /> Watch how it works
            </button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm font-body text-slate-500 dark:text-slate-400">
            <div className="flex -space-x-2">
              {["6366F1", "2563EB", "7C3AED", "16A34A"].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-950" style={{ background: `#${c}` }} />
              ))}
            </div>
            <span>Joined by 240,000+ learners this year</span>
          </div>
        </div>

        <GlassCard className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">Your roadmap · Data Analytics</span>
            <Pill tone="blue">3 of 5 stages</Pill>
          </div>
          <LearningPath dark={false} />
        </GlassCard>
      </div>
    </section>
  );
}
