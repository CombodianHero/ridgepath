import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PanelHeader from "@/components/PanelHeader";
import GlassCard from "@/components/GlassCard";
import Pill from "@/components/Pill";
import AddLessonForm from "@/components/AddLessonForm";
import PublishToggle from "@/components/PublishToggle";

export default async function ManageCourse({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      lessons: { orderBy: { order: "asc" } },
      enrollments: { include: { student: { select: { name: true, email: true } } } },
    },
  });

  if (!course) notFound();
  if (course.teacherId !== session!.user.id && session!.user.role !== "ADMIN") notFound();

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Pill tone={course.published ? "green" : "orange"}>{course.published ? "Published" : "Draft"}</Pill>
            <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-2">{course.title}</h1>
            <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1">{course.description}</p>
          </div>
          <PublishToggle courseId={course.id} published={course.published} />
        </div>

        <GlassCard className="p-5 mt-6">
          <h2 className="font-display font-bold text-slate-900 dark:text-white mb-4">
            Lessons ({course.lessons.length})
          </h2>
          <div className="space-y-2 mb-5">
            {course.lessons.map((l) => (
              <div key={l.id} className="p-3 rounded-xl bg-slate-900/[0.03] dark:bg-white/5">
                <p className="text-sm font-body font-semibold text-slate-800 dark:text-slate-100">{l.title}</p>
                <p className="text-xs font-body text-slate-500 dark:text-slate-400 mt-1">{l.content}</p>
              </div>
            ))}
            {course.lessons.length === 0 && <p className="text-sm font-body text-slate-400">No lessons yet — add the first one below.</p>}
          </div>
          <AddLessonForm courseId={course.id} />
        </GlassCard>

        <GlassCard className="p-5 mt-5">
          <h2 className="font-display font-bold text-slate-900 dark:text-white mb-4">
            Enrolled students ({course.enrollments.length})
          </h2>
          {course.enrollments.length === 0 ? (
            <p className="text-sm font-body text-slate-400">No students enrolled yet.</p>
          ) : (
            <div className="space-y-2">
              {course.enrollments.map((e) => (
                <div key={e.id} className="flex items-center justify-between text-sm font-body py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
                  <span className="text-slate-800 dark:text-slate-100 font-medium">{e.student.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{e.student.email}</span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
