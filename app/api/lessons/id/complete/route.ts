import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const lesson = await prisma.lesson.findUnique({ where: { id: params.id } });
  if (!lesson) return NextResponse.json({ error: "Lesson not found." }, { status: 404 });

  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId: session.user.id, courseId: lesson.courseId } },
  });
  if (!enrollment) return NextResponse.json({ error: "You're not enrolled in this course." }, { status: 403 });

  const existing = await prisma.lessonCompletion.findUnique({
    where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId: lesson.id } },
  });

  if (existing) {
    // toggle off
    await prisma.lessonCompletion.delete({ where: { id: existing.id } });
    return NextResponse.json({ ok: true, completed: false });
  }

  await prisma.lessonCompletion.create({
    data: { enrollmentId: enrollment.id, lessonId: lesson.id },
  });

  return NextResponse.json({ ok: true, completed: true });
}
