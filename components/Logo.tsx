import { palette } from "@/lib/tokens";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative w-8 h-8">
        <div
          className="absolute inset-0 rounded-xl rotate-6"
          style={{ background: `linear-gradient(135deg, ${palette.blue}, ${palette.purple})` }}
        />
        <div
          className="absolute inset-0 rounded-xl -rotate-6 opacity-60"
          style={{ background: `linear-gradient(135deg, ${palette.indigo}, ${palette.blue})` }}
        />
        <div className="absolute inset-[3px] rounded-lg bg-white/90 dark:bg-slate-900/90 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full" style={{ background: palette.blue }} />
        </div>
      </div>
      <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
        Ridge<span style={{ color: palette.blue }}>path</span>
      </span>
    </div>
  );
}
