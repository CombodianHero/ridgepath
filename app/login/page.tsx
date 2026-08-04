"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GlassCard from "@/components/GlassCard";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function afterLogin() {
    // Ask NextAuth for the session to know where to send the user
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    const role = session?.user?.role;

    if (role === "ADMIN") router.push("/admin");
    else if (role === "TEACHER") router.push("/teacher");
    else router.push("/student");
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("password", { redirect: false, email, password });
    setLoading(false);

    if (res?.error) {
      setError(res.error);
      return;
    }
    await afterLogin();
  }

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, purpose: "LOGIN" }),
    });

    setLoading(false);
    setCodeSent(true);
  }

  async function handleOtpLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("otp", { redirect: false, email, code });
    setLoading(false);

    if (res?.error) {
      setError(res.error);
      return;
    }
    await afterLogin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-5 py-12">
      <GlassCard className="w-full max-w-md p-8">
        <h1 className="font-display font-extrabold text-2xl text-slate-900">Welcome back</h1>

        <div className="flex gap-1 bg-slate-900/5 rounded-full p-1 mt-5 mb-2">
          {(["password", "otp"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError("");
                setCodeSent(false);
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold font-body transition-colors ${
                mode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              {m === "password" ? "Password" : "Email code"}
            </button>
          ))}
        </div>

        {mode === "password" ? (
          <form onSubmit={handlePasswordLogin} className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-slate-700">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-slate-700">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-600 font-body">{error}</p>}
            <button
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold font-body bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        ) : (
          <form onSubmit={codeSent ? handleOtpLogin : requestCode} className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-slate-700">Email</label>
              <input
                required
                type="email"
                disabled={codeSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm disabled:bg-slate-50"
              />
            </div>
            {codeSent && (
              <div>
                <label className="text-sm font-body font-medium text-slate-700">6-digit code</label>
                <input
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-body text-sm tracking-[0.3em]"
                />
              </div>
            )}
            {error && <p className="text-sm text-red-600 font-body">{error}</p>}
            <button
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold font-body bg-gradient-to-br from-brand-blue to-brand-indigo disabled:opacity-60"
            >
              {loading ? "Please wait..." : codeSent ? "Verify & log in" : "Send code"}
            </button>
          </form>
        )}

        <p className="text-sm font-body text-slate-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
