"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Flame, Zap, Target, Trophy, Calendar, BookOpen, Award, Circle, Play, LucideIcon } from "lucide-react";
import { palette, Tone } from "@/lib/tokens";
import GlassCard from "./GlassCard";
import Pill from "./Pill";
import ProgressRing from "./ProgressRing";

type Stat = { label: string; value: string; icon: LucideIcon; color: string };
type ScheduleItem = { time: string; title: string; tag: string; tone: Tone };
export type CourseProgress = { id: string; title: string; pct: number; color: string };

// These stay illustrative for now — there's no streak/XP/schedule tracking in the database yet.
const stats: Stat[] = [
  { label: "Learning streak", value: "18 days", icon: Flame, color: palette.orange },
  { label: "XP this week", value: "1,240", icon: Zap, color: palette.purple },
  { label: "Avg. score", value: "88%", icon: Target, color: palette.green },
  { label: "Rank", value: "#12", icon: Trophy, color: palette.blue },
];

const schedule: ScheduleItem[] = [
  { time: "9:00 AM", title: "Live: SQL Window Functions", tag: "Live class", tone: "orange" },
  { time: "11:30 AM", title: "Assignment due: Regression Project", tag: "Assignment", tone: "purple" },
  { time: "4:00 PM", title: "Continue: Data Visualization Ch. 4", tag: "Lesson", tone: "blue" },
];

const week = [40, 65, 30, 80, 55, 20, 70];
const badgeColors = [palette.blue, palette.purple, palette.green, "#94a3b8", "#94a3b8", palette.orange, "#94a3b8", "#94a3b8"];

export default function Dashboard({ courses = [] }: { courses?: CourseProgress[] }) {
  const [range, setRange] = useState<"Week" | "Month">("Week");
  const { data: session } = useSession();
  const inProgress = courses.filter((c) => c.pct < 100).length;

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Welcome back, {session?.user?.name?.split(" ")[0] ?? "there"} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-body mt-1">
            {courses.length === 0
              ? "Browse the catalog to enroll in your first course."
              : `You have ${inProgress} course${inProgress === 1 ? "" : "s"} in progress.`}
          </p>
        </div>
        <Link
          href="/student/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold font-body shadow-lg shadow-blue-600/20 bg-gradient-to-br from-brand-blue to-brand-indigo"
        >
          <Play size={14} /> Browse courses
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <GlassCard key={label} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-slate-900 dark:text-white leading-none">{value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-body mt-1">{label}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-slate-900 dark:text-white">Study time</h3>
            <div className="flex gap-1 bg-slate-900/5 dark:bg-white/5 rounded-full p-1">
              {(["Week", "Month"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold font-body transition-colors ${
                    range === r ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {week.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-lg relative overflow-hidden"
                  style={{ height: `${h}%`, background: `linear-gradient(180deg, ${palette.blue}, ${palette.indigo})`, opacity: i === 3 ? 1 : 0.35 }}
                >
                  {i === 3 && <div className="absolute inset-0 bg-white/20" />}
                </div>
                <span className="text-[11px] font-body text-slate-400">{["S", "M", "T", "W", "T", "F", "S"][i]}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-blue-500" />
            <h3 className="font-display font-bold text-slate-900 dark:text-white">Today&apos;s schedule</h3>
          </div>
          <div className="space-y-3">
            {schedule.map((s) => (
              <div key={s.title} className="flex items-start gap-3">
                <span className="text-xs font-body text-slate-400 w-16 shrink-0 pt-0.5">{s.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-slate-800 dark:text-slate-100 truncate">{s.title}</p>
                  <Pill tone={s.tone}>{s.tag}</Pill>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-500" />
              <h3 className="font-display font-bold text-slate-900 dark:text-white">Continue learning</h3>
            </div>
            <Link href="/student/courses" className="text-xs font-body font-semibold text-blue-600 dark:text-blue-400">
              Browse courses
            </Link>
          </div>
          {courses.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm font-body text-slate-400 mb-3">You're not enrolled in any courses yet.</p>
              <Link href="/student/courses" className="text-sm font-body font-semibold text-blue-600 dark:text-blue-400">
                Browse the catalog →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((c) => (
                <Link key={c.id} href={`/student/courses/${c.id}`} className="flex items-center gap-4">
                  <ProgressRing percent={c.pct} color={c.color} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body font-semibold text-slate-800 dark:text-slate-100">{c.title}</span>
                      <span className="text-xs font-body font-semibold" style={{ color: c.color }}>
                        {c.pct}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-purple-500" />
            <h3 className="font-display font-bold text-slate-900 dark:text-white">Achievements</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badgeColors.map((c, i) => (
              <div key={i} className="aspect-square rounded-xl flex items-center justify-center" style={{ background: `${c}18` }}>
                {c === "#94a3b8" ? <Circle size={16} className="text-slate-300 dark:text-slate-600" /> : <Trophy size={16} style={{ color: c }} />}
              </div>
            ))}
          </div>
          <p className="text-xs font-body text-slate-400 mt-4">3 new badges this month</p>
        </GlassCard>
      </div>
    </div>
  );
}
