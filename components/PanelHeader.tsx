"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import Pill from "./Pill";

export default function PanelHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          {session?.user && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-body font-medium text-slate-700 dark:text-slate-200">{session.user.name}</span>
              <Pill tone="blue">{session.user.role}</Pill>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-body border border-slate-300/70 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
