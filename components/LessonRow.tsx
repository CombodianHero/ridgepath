"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";

export default function LessonRow({
  lessonId,
  title,
  content,
  initiallyCompleted,
}: {
  lessonId: string;
  title: string;
  content: string;
  initiallyCompleted: boolean;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/lessons/${lessonId}/complete`, { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setCompleted(data.completed);
      router.refresh();
    }
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/[0.03] dark:bg-white/5">
      <button onClick={toggle} disabled={loading} className="mt-0.5 shrink-0">
        {completed ? <CheckCircle2 size={20} className="text-green-600" /> : <Circle size={20} className="text-slate-300" />}
      </button>
      <div>
        <p className={`text-sm font-body font-semibold ${completed ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}>
          {title}
        </p>
        <p className="text-xs font-body text-slate-500 dark:text-slate-400 mt-1">{content}</p>
      </div>
    </div>
  );
}
