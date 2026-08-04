import { ArrowRight } from "lucide-react";
import { palette } from "@/lib/tokens";
import CourseCard, { Course } from "./CourseCard";

const courses: Course[] = [
  { title: "Applied Machine Learning", cat: "AI & Data", tone: "blue", rating: "4.9", students: "12k", hours: "38h", color: palette.blue },
  { title: "Product Design Systems", cat: "Design", tone: "purple", rating: "4.8", students: "9.4k", hours: "24h", color: palette.purple },
  { title: "Full-Stack with TypeScript", cat: "Development", tone: "green", rating: "4.9", students: "18k", hours: "52h", color: palette.green },
  { title: "Financial Modeling", cat: "Business", tone: "orange", rating: "4.7", students: "6.1k", hours: "19h", color: palette.orange },
];

export default function TrendingCourses() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-body font-semibold uppercase tracking-wider text-blue-500">Trending now</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Courses learners can&apos;t stop talking about
          </h2>
        </div>
        <button className="hidden sm:flex items-center gap-1 text-sm font-body font-semibold text-blue-600 dark:text-blue-400">
          Browse all <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {courses.map((c) => (
          <CourseCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
