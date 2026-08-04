import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookOpen, Users, FileEdit, CheckCircle2 } from "lucide-react";
import PanelHeader from "@/components/PanelHeader";
import GlassCard from "@/components/GlassCard";
import Pill from "@/components/Pill";

export default async function TeacherPanel() {
  const session = await getServerSession(authOptions);
  const teacherId = session!.user.id;

  const courses = await prisma.course.findMany({
    where: { teacherId },
    include: { _count: { select: { lessons: true, enrollments: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalStudents = courses.reduce((a, c) => a + c._count.enrollments, 0);
  const publishedCount = courses.filter((c) => c.published).length;
  const draftCount = courses.length - publishedCount;

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Welcome, {session!.user.name} 👋
          </h1>
          <Link
            href="/teacher/courses/new"
            className="px-5 py-2.5 rounded-full text-white text-sm font-semibold font-body bg-gradient-to-br from-brand-blue to-brand-indigo"
          >
            + New course
          </Link>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 my-6">
          {[
            { label: "Courses", value: courses.length, icon: BookOpen },
            { label: "Students", value: totalStudents, icon: Users },
            { label: "Published", value: publishedCount, icon: CheckCircle2 },
            { label: "Drafts", value: draftCount, icon: FileEdit },
          ].map(({ label, value, icon: Icon }) => (
            <GlassCard key={label} className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-slate-900 dark:text-white leading-none">{value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-body mt-1">{label}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-5">
          <h2 className="font-display font-bold text-slate-900 dark:text-white mb-4">Your courses</h2>
          {courses.length === 0 ? (
            <p className="text-sm font-body text-slate-400">You haven't created any courses yet.</p>
          ) : (
            <div className="space-y-3">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={`/teacher/courses/${c.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/[0.03] dark:bg-white/5 hover:bg-slate-900/[0.06] dark:hover:bg-white/10 transition-colors"
                >
                  <div>
                    <p className="text-sm font-body font-semibold text-slate-800 dark:text-slate-100">{c.title}</p>
                    <p className="text-xs font-body text-slate-500 dark:text-slate-400">
                      {c._count.enrollments} students · {c._count.lessons} lessons
                    </p>
                  </div>
                  <Pill tone={c.published ? "green" : "orange"}>{c.published ? "Published" : "Draft"}</Pill>
                </Link>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
