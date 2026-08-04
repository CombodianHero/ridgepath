"use client";

import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({
  dark,
  setDark,
  tab,
  setTab,
}: {
  dark: boolean;
  setDark: (v: boolean) => void;
  tab: "landing" | "dashboard";
  setTab: (v: "landing" | "dashboard") => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1 font-body text-sm font-medium">
            {["Courses", "Live classes", "Community", "Pricing"].map((item) => (
              <button
                key={item}
                className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
              >
                {item}
                {item === "Courses" && <ChevronDown size={14} />}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search courses, topics..."
              className="w-full pl-9 pr-3 py-2 rounded-full text-sm font-body bg-slate-900/5 dark:bg-white/5 border border-transparent focus:border-blue-500/40 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTab(tab === "landing" ? "dashboard" : "landing")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-body border border-slate-300/70 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {tab === "landing" ? "View dashboard demo" : "View landing page"}
          </button>
          <button
            aria-label="Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
          </button>
          <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="ml-1 hidden sm:inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold font-body text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-px transition-all bg-gradient-to-br from-brand-blue to-brand-indigo">
            Get started
          </button>
          <button className="lg:hidden w-9 h-9 flex items-center justify-center text-slate-600 dark:text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-5 pb-4 flex flex-col gap-1 font-body text-sm font-medium bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10">
          {["Courses", "Live classes", "Community", "Pricing"].map((item) => (
            <button key={item} className="text-left px-2 py-2.5 rounded-lg text-slate-600 dark:text-slate-300">
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
