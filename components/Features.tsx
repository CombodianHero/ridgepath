import { Sparkles, BarChart3, Users, Award, LucideIcon } from "lucide-react";
import { palette } from "@/lib/tokens";
import GlassCard from "./GlassCard";

type Feature = { icon: LucideIcon; title: string; desc: string; color: string };

const items: Feature[] = [
  { icon: Sparkles, title: "AI study assistant", desc: "Get concepts explained, quizzes generated, and doubts answered in real time.", color: palette.purple },
  { icon: BarChart3, title: "Progress that's actually clear", desc: "See exactly what's mastered, what's shaky, and what to review next.", color: palette.blue },
  { icon: Users, title: "Live, not just recorded", desc: "Join classes with real instructors, raise your hand, get answers on the spot.", color: palette.green },
  { icon: Award, title: "Certificates that verify", desc: "Every certificate carries a QR code employers can check instantly.", color: palette.orange },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          Everything a self-directed learner needs
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 font-body">
          No clutter, no dead ends — just a clear path from where you are to where you&apos;re going.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(({ icon: Icon, title, desc, color }) => (
          <GlassCard key={title} className="p-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">{desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
