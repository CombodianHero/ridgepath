"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PanelHeader from "@/components/PanelHeader";
import GlassCard from "@/components/GlassCard";

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", category: "General" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push(`/teacher/courses/${data.course.id}`);
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950">
      <PanelHeader />
      <div className="max-w-xl mx-auto px-5 sm:px-8 py-10">
        <GlassCard className="p-8">
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">New course</h1>
          <p className="text-sm font-body text-slate-500 dark:text-slate-400 mt-1">Starts as a draft — publish it once you've added lessons.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-slate-700 dark:text-slate-300">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-900 focus:border-blue-500 outline-none font-body text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-slate-700 dark:text-slate-300">Category</label>
              <input
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-900 focus:border-blue-500 outline-none font-body text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-slate-700 dark:text-slate-300">Description</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-900 focus:border-blue-500 outline-none font-body text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-600 font-body">{error}</p>}
            <button
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold font-body bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create course"}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
