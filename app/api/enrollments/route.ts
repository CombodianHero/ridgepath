import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({ courseId: z.string() });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const course = await prisma.course.findUnique({ where: { id: parsed.data.courseId } });
  if (!course || !course.published) {
    return NextResponse.json({ error: "Course not available." }, { status: 404 });
  }

  const existing = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId: session.user.id, courseId: course.id } },
  });
  if (existing) return NextResponse.json({ ok: true, enrollment: existing });

  const enrollment = await prisma.enrollment.create({
    data: { studentId: session.user.id, courseId: course.id },
  });

  return NextResponse.json({ ok: true, enrollment });
}
