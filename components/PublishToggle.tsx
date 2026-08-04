"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublishToggle({ courseId, published }: { courseId: string; published: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch(`/api/courses/${courseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-colors disabled:opacity-60 ${
        published ? "bg-green-500/10 text-green-700" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
      }`}
    >
      {loading ? "Saving..." : published ? "Published — click to unpublish" : "Publish course"}
    </button>
  );
}
