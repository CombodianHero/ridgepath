"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "STUDENT" as "STUDENT" | "TEACHER" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
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

    router.push(`/verify-otp?email=${encodeURIComponent(form.email)}&purpose=REGISTER_VERIFY`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-5 py-12">
      <GlassCard className="w-full max-w-md p-8">
        <h1 className="font-display font-extrabold text-2xl text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-500 font-body mt-1">We'll email you a code to verify it's really you.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-body font-medium text-slate-700">Full name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-body font-medium text-slate-700">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-body font-medium text-slate-700">Password</label>
            <input
              required
              minLength={8}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-body font-medium text-slate-700 mb-2 block">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              {(["STUDENT", "TEACHER"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex items-center gap-2 justify-center py-2.5 rounded-xl border text-sm font-body font-semibold transition-colors ${
                    form.role === r ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500"
                  }`}
                >
                  {r === "STUDENT" ? <GraduationCap size={16} /> : <Users size={16} />}
                  {r === "STUDENT" ? "Student" : "Teacher"}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600 font-body">{error}</p>}

          <button
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold font-body bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm font-body text-slate-500 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Log in
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
