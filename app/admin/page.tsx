import { prisma } from "@/lib/prisma";
import PanelHeader from "@/components/PanelHeader";
import GlassCard from "@/components/GlassCard";
import Pill from "@/components/Pill";
import { Users, GraduationCap, ShieldCheck, BookOpen } from "lucide-react";

export default async function AdminPanel() {
  const [users, courses] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, emailVerified: true, createdAt: true },
    }),
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: { teacher: { select: { name: true } }, _count: { select: { enrollments: true, lessons: true } } },
    }),
  ]);

  const counts = {
    STUDENT: users.filter((u) => u.role === "STUDENT").length,
    TEACHER: users.filter((u) => u.role === "TEACHER").length,
    ADMIN: users.filter((u) => u.role === "ADMIN").length,
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mb-6">Admin overview</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <GraduationCap size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="font-display font-bold text-xl text-slate-900 dark:text-white">{counts.STUDENT}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-body">Students</div>
            </div>
          </GlassCard>
          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Users size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="font-display font-bold text-xl text-slate-900 dark:text-white">{counts.TEACHER}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-body">Teachers</div>
            </div>
          </GlassCard>
          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <ShieldCheck size={18} className="text-green-600" />
            </div>
            <div>
              <div className="font-display font-bold text-xl text-slate-900 dark:text-white">{counts.ADMIN}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-body">Admins</div>
            </div>
          </GlassCard>
          <GlassCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <BookOpen size={18} className="text-orange-600" />
            </div>
            <div>
              <div className="font-display font-bold text-xl text-slate-900 dark:text-white">{courses.length}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-body">Courses</div>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-5">
          <h2 className="font-display font-bold text-slate-900 dark:text-white mb-4">All users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-200/60 dark:border-white/10">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Verified</th>
                  <th className="pb-2 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 dark:border-white/5 last:border-0">
                    <td className="py-2.5 text-slate-800 dark:text-slate-100 font-medium">{u.name}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{u.email}</td>
                    <td className="py-2.5">
                      <Pill tone={u.role === "ADMIN" ? "purple" : u.role === "TEACHER" ? "orange" : "blue"}>{u.role}</Pill>
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{u.emailVerified ? "Yes" : "No"}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{u.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      No users yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-5 mt-5">
          <h2 className="font-display font-bold text-slate-900 dark:text-white mb-4">All courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-200/60 dark:border-white/10">
                  <th className="pb-2 font-medium">Title</th>
                  <th className="pb-2 font-medium">Teacher</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Lessons</th>
                  <th className="pb-2 font-medium">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 dark:border-white/5 last:border-0">
                    <td className="py-2.5 text-slate-800 dark:text-slate-100 font-medium">{c.title}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{c.teacher.name}</td>
                    <td className="py-2.5">
                      <Pill tone={c.published ? "green" : "orange"}>{c.published ? "Published" : "Draft"}</Pill>
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{c._count.lessons}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{c._count.enrollments}</td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      No courses yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
