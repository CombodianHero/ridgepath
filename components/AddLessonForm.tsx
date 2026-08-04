"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLessonForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`/api/courses/${courseId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setTitle("");
    setContent("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        placeholder="Lesson title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-900 focus:border-blue-500 outline-none font-body text-sm"
      />
      <textarea
        required
        rows={3}
        placeholder="Lesson content / notes / video URL"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-900 focus:border-blue-500 outline-none font-body text-sm"
      />
      {error && <p className="text-sm text-red-600 font-body">{error}</p>}
      <button
        disabled={loading}
        className="px-4 py-2 rounded-full text-sm font-semibold font-body text-white bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add lesson"}
      </button>
    </form>
  );
}
