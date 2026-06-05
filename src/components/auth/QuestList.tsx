import SectionLabel from "./SectionLabel";

interface QuestCardProps {
  rank: string;
  rankColor: string;
  title: string;
  description: string;
  xp: number;
  current: number;
  total: number;
  completed?: boolean;
}

const rankColors: Record<string, { text: string; border: string; bar: string; glow: string }> = {
  E: { text: "#00ff96", border: "rgba(0,255,150,0.4)",  bar: "#00ff96", glow: "rgba(0,255,150,0.4)"  },
  D: { text: "#00c8ff", border: "rgba(0,200,255,0.4)",  bar: "#00c8ff", glow: "rgba(0,200,255,0.4)"  },
  C: { text: "#ffd700", border: "rgba(255,215,0,0.4)",  bar: "#ffd700", glow: "rgba(255,215,0,0.35)" },
  B: { text: "#ff9f43", border: "rgba(255,159,67,0.4)", bar: "#ff9f43", glow: "rgba(255,159,67,0.35)"},
  A: { text: "#ff6b6b", border: "rgba(255,107,107,0.4)",bar: "#ff6b6b", glow: "rgba(255,107,107,0.35)"},
  S: { text: "#c77dff", border: "rgba(199,125,255,0.4)",bar: "#c77dff", glow: "rgba(199,125,255,0.35)"},
};

const QuestCard = ({
  rank,
  title,
  description,
  xp,
  current,
  total,
  completed = false,
}: QuestCardProps) => {
  const colors = rankColors[rank] ?? rankColors["E"];
  const pct = Math.min((current / total) * 100, 100);

  return (
    <div
      className="relative px-3 py-2"
      style={{
        border: `1px solid ${completed ? "rgba(0,255,150,0.15)" : "rgba(0,180,255,0.12)"}`,
        background: "rgba(0,12,35,0.6)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg,transparent,${
            completed ? "rgba(0,255,150,0.25)" : "rgba(0,200,255,0.25)"
          },transparent)`,
        }}
      />

      {/* Header row */}
      <div className="mb-[4px] flex items-center gap-2">
        <span
          className="font-mono text-[8px] font-bold"
          style={{
            border: `1px solid ${colors.border}`,
            color: colors.text,
            padding: "1px 5px",
          }}
        >
          {rank}
        </span>
        <span className="flex-1 text-[0.82rem] font-semibold tracking-[0.03em] text-[#c8eeff]">
          {title}
        </span>
        <span className="font-mono text-[8px]" style={{ color: colors.text }}>
          +{xp} XP
        </span>
      </div>

      {/* Description */}
      <p className="mb-[6px] text-[0.72rem] text-[rgba(160,210,255,0.55)]">{description}</p>

      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="h-[2px] flex-1 bg-[rgba(0,100,160,0.2)]">
          <div
            className="h-[2px] rounded-[1px] transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: colors.bar,
              boxShadow: `0 0 4px ${colors.glow}`,
            }}
          />
        </div>
        {completed ? (
          <span className="font-mono text-[7px] tracking-[0.2em] text-[#00ff96]">
            ✓ COMPLETE
          </span>
        ) : (
          <span className="font-mono text-[7px] text-[rgba(0,180,255,0.5)]">
            {current} / {total}
          </span>
        )}
      </div>
    </div>
  );
};

const quests: QuestCardProps[] = [
  {
    rank: "D",
    rankColor: "#00c8ff",
    title: "Protein Warrior",
    description: "Hit 160g protein for 3 consecutive days",
    xp: 150,
    current: 2,
    total: 3,
  },
  {
    rank: "E",
    rankColor: "#00ff96",
    title: "Log Every Meal",
    description: "Log all meals for 7 days",
    xp: 80,
    current: 7,
    total: 7,
    completed: true,
  },
  {
    rank: "C",
    rankColor: "#ffd700",
    title: "Calorie Deficit",
    description: "Stay under calorie target for 5 days",
    xp: 300,
    current: 2,
    total: 5,
  },
];

const QuestList = () => (
  <div>
    <SectionLabel label="Active Quests" />
    <div className="flex flex-col gap-[6px]">
      {quests.map((q) => (
        <QuestCard key={q.title} {...q} />
      ))}
    </div>
  </div>
);

export default QuestList;