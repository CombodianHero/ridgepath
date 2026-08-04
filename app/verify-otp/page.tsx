"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/GlassCard";

function VerifyOtpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const purpose = (params.get("purpose") as "REGISTER_VERIFY" | "LOGIN") ?? "REGISTER_VERIFY";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, purpose }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Verification failed.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  async function resend() {
    setResent(false);
    await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, purpose }),
    });
    setResent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-5 py-12">
      <GlassCard className="w-full max-w-md p-8">
        <h1 className="font-display font-extrabold text-2xl text-slate-900">Check your email</h1>
        <p className="text-sm text-slate-500 font-body mt-1">
          We sent a 6-digit code to <span className="font-semibold text-slate-700">{email}</span>
        </p>

        {success ? (
          <p className="mt-6 text-sm font-body text-green-600 font-semibold">Verified! Redirecting to login...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-lg text-center tracking-[0.4em]"
            />
            {error && <p className="text-sm text-red-600 font-body">{error}</p>}
            <button
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold font-body bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button type="button" onClick={resend} className="w-full text-sm font-body text-blue-600 font-semibold">
              {resent ? "Code resent" : "Resend code"}
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
}
