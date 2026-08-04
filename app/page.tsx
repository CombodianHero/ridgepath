"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TrendingCourses from "@/components/TrendingCourses";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState<"landing" | "dashboard">("landing");

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-slate-950 transition-colors duration-300">
        <Navbar dark={dark} setDark={setDark} tab={tab} setTab={setTab} />
        {tab === "landing" ? (
          <>
            <Hero />
            <TrustBar />
            <TrendingCourses />
            <Features />
            <Pricing />
            <Footer />
          </>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}
