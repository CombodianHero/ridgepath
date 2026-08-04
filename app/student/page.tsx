import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { palette } from "@/lib/tokens";
import { progressPercent } from "@/lib/progress";
import PanelHeader from "@/components/PanelHeader";
import Dashboard from "@/components/Dashboard";

const colorCycle = [palette.blue, palette.purple, palette.green, palette.orange];

export default async function StudentPanel() {
  const session = await getServerSession(authOptions);

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: session!.user.id },
    include: {
      course: { select: { id: true, title: true, lessons: { select: { id: true } } } },
      completions: { select: { lessonId: true } },
    },
    orderBy: { enrolledAt: "desc" },
  });

  const courses = enrollments.map((e, i) => ({
    id: e.course.id,
    title: e.course.title,
    pct: progressPercent(e.course.lessons.length, e.completions.length),
    color: colorCycle[i % colorCycle.length],
  }));

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <Dashboard courses={courses} />
    </div>
  );
}
