import Logo from "./Logo";

const cols = [
  { title: "Product", links: ["Courses", "Live classes", "AI assistant", "Certificates"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Partners"] },
  { title: "Resources", links: ["Help center", "Community", "Guides", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-white/10 mt-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-body max-w-xs">
            A clearer way to learn — one roadmap, one step at a time.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l} className="text-sm font-body text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 border-t border-slate-200/60 dark:border-white/10 text-xs font-body text-slate-400">
        © 2026 Ridgepath. All rights reserved.
      </div>
    </footer>
  );
}
