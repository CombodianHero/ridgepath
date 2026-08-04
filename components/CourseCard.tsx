import { Star, Users, Clock } from "lucide-react";
import { Tone } from "@/lib/tokens";
import GlassCard from "./GlassCard";
import Pill from "./Pill";

export type Course = {
  title: string;
  cat: string;
  tone: Tone;
  rating: string;
  students: string;
  hours: string;
  color: string;
};

export default function CourseCard({ title, cat, tone, rating, students, hours, color }: Course) {
  return (
    <GlassCard className="p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div
        className="h-32 rounded-xl mb-4 relative overflow-hidden flex items-end p-3"
        style={{ background: `linear-gradient(135deg, ${color}22, ${color}55)` }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: `radial-gradient(circle at 30% 20%, ${color}, transparent 60%)` }}
        />
        <Pill tone={tone}>{cat}</Pill>
      </div>
      <h3 className="font-display font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <div className="mt-3 flex items-center gap-3 text-xs font-body text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Star size={12} className="fill-amber-400 text-amber-400" /> {rating}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} /> {students}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {hours}
        </span>
      </div>
    </GlassCard>
  );
}
