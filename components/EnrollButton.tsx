"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId, alreadyEnrolled }: { courseId: string; alreadyEnrolled: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(alreadyEnrolled);

  async function enroll() {
    setLoading(true);
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    setLoading(false);
    if (res.ok) {
      setEnrolled(true);
      router.refresh();
    }
  }

  if (enrolled) {
    return (
      <button
        onClick={() => router.push(`/student/courses/${courseId}`)}
        className="px-4 py-2 rounded-full text-sm font-semibold font-body bg-slate-900 dark:bg-white text-white dark:text-slate-900"
      >
        Continue
      </button>
    );
  }

  return (
    <button
      onClick={enroll}
      disabled={loading}
      className="px-4 py-2 rounded-full text-sm font-semibold font-body text-white bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
    >
      {loading ? "Enrolling..." : "Enroll"}
    </button>
  );
}
