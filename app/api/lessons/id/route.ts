import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(2).optional(),
  content: z.string().min(2).optional(),
});

async function assertOwner(lessonId: string, userId: string, role: string) {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId }, include: { course: true } });
  if (!lesson) return { ok: false, status: 404, error: "Lesson not found." };
  if (lesson.course.teacherId !== userId && role !== "ADMIN") {
    return { ok: false, status: 403, error: "Not authorized." };
  }
  return { ok: true as const, lesson };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const check = await assertOwner(params.id, session.user.id, session.user.role);
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const lesson = await prisma.lesson.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json({ ok: true, lesson });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const check = await assertOwner(params.id, session.user.id, session.user.role);
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  await prisma.lesson.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
