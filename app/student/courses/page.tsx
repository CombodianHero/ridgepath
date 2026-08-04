import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PanelHeader from "@/components/PanelHeader";
import GlassCard from "@/components/GlassCard";
import Pill from "@/components/Pill";
import EnrollButton from "@/components/EnrollButton";

export default async function CourseCatalog() {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const [courses, myEnrollments] = await Promise.all([
    prisma.course.findMany({
      where: { published: true },
      include: { teacher: { select: { name: true } }, _count: { select: { lessons: true, enrollments: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.enrollment.findMany({ where: { studentId: userId }, select: { courseId: true } }),
  ]);

  const enrolledIds = new Set(myEnrollments.map((e) => e.courseId));

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mb-6">Course catalog</h1>

        {courses.length === 0 && (
          <GlassCard className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-body">No published courses yet. Check back soon.</p>
          </GlassCard>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <GlassCard key={c.id} className="p-5 flex flex-col">
              <Pill tone="blue">{c.category}</Pill>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mt-3">{c.title}</h3>
              <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1 flex-1">{c.description}</p>
              <div className="flex items-center justify-between mt-4 text-xs font-body text-slate-400">
                <span>By {c.teacher.name}</span>
                <span>
                  {c._count.lessons} lessons · {c._count.enrollments} enrolled
                </span>
              </div>
              <div className="mt-4">
                <EnrollButton courseId={c.id} alreadyEnrolled={enrolledIds.has(c.id)} />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
