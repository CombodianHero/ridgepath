import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PanelHeader from "@/components/PanelHeader";
import GlassCard from "@/components/GlassCard";
import LessonRow from "@/components/LessonRow";
import { progressPercent } from "@/lib/progress";

export default async function CourseDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { lessons: { orderBy: { order: "asc" } }, teacher: { select: { name: true } } },
  });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId: userId, courseId: course.id } },
    include: { completions: true },
  });
  if (!enrollment) notFound(); // must enroll first, from the catalog page

  const completedLessonIds = new Set(enrollment.completions.map((c) => c.lessonId));
  const pct = progressPercent(course.lessons.length, completedLessonIds.size);

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">{course.title}</h1>
        <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1">
          By {course.teacher.name} · {pct}% complete
        </p>

        <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden max-w-sm">
          <div className="h-full rounded-full bg-brand-blue" style={{ width: `${pct}%` }} />
        </div>

        <GlassCard className="p-5 mt-6">
          <h2 className="font-display font-bold text-slate-900 dark:text-white mb-4">Lessons</h2>
          {course.lessons.length === 0 ? (
            <p className="text-sm font-body text-slate-400">No lessons added yet.</p>
          ) : (
            <div className="space-y-3">
              {course.lessons.map((l) => (
                <LessonRow
                  key={l.id}
                  lessonId={l.id}
                  title={l.title}
                  content={l.content}
                  initiallyCompleted={completedLessonIds.has(l.id)}
                />
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
