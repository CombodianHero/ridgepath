import { palette } from "@/lib/tokens";

type Node = { x: number; y: number; label: string; done?: boolean; active?: boolean };

const nodes: Node[] = [
  { x: 40, y: 210, label: "Foundations", done: true },
  { x: 150, y: 130, label: "Core skills", done: true },
  { x: 270, y: 175, label: "Applied projects", active: true },
  { x: 385, y: 90, label: "Specialization" },
  { x: 470, y: 155, label: "Certified" },
];

export default function LearningPath({ dark = false }: { dark?: boolean }) {
  const pathD = `M ${nodes.map((n) => `${n.x},${n.y}`).join(" L ")}`;

  return (
    <svg viewBox="0 0 520 260" className="w-full h-auto overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke={dark ? "#334155" : "#CBD5E1"}
        strokeWidth={3}
        strokeDasharray="1 10"
        strokeLinecap="round"
      />
      <path
        d={`M ${nodes[0].x},${nodes[0].y} L ${nodes[1].x},${nodes[1].y} L ${nodes[2].x},${nodes[2].y}`}
        fill="none"
        stroke={palette.blue}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 10"
      />
      {nodes.map((n, i) => (
        <g key={i}>
          {n.active && (
            <circle cx={n.x} cy={n.y} r={16} fill={palette.blue} opacity={0.15}>
              <animate attributeName="r" values="14;20;14" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.2s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r={9}
            fill={n.done ? palette.blue : n.active ? "#fff" : dark ? "#1e293b" : "#fff"}
            stroke={n.done || n.active ? palette.blue : dark ? "#475569" : "#CBD5E1"}
            strokeWidth={2.5}
          />
          {n.done && (
            <path
              d={`M ${n.x - 3.5} ${n.y} l 2.5 2.5 l 5 -5.5`}
              stroke="white"
              strokeWidth={1.8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <text
            x={n.x}
            y={n.y - 20}
            textAnchor="middle"
            className="font-body"
            fontSize={11}
            fontWeight={n.active ? 700 : 500}
            fill={n.active ? palette.blue : dark ? "#94a3b8" : "#64748b"}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
