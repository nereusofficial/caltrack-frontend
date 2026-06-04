type QuestRank = "E" | "D" | "C" | "B" | "A" | "S";

interface QuestCardProps {
  rank: QuestRank;
  title: string;
  description: string;
  xp: number;
  current: number;
  total: number;
  completed?: boolean;
}

const rankColors: Record<QuestRank, { border: string; text: string; bar: string }> = {
  E: { border: "rgba(140,180,255,0.4)", text: "rgba(140,180,255,0.8)", bar: "rgba(140,180,255,0.6)" },
  D: { border: "rgba(0,200,255,0.5)",   text: "#00c8ff",               bar: "#00c8ff"                },
  C: { border: "rgba(0,255,150,0.5)",   text: "#00ff96",               bar: "#00ff96"                },
  B: { border: "rgba(180,100,255,0.5)", text: "#c87fff",               bar: "#c87fff"                },
  A: { border: "rgba(255,160,0,0.5)",   text: "#ffa040",               bar: "#ffa040"                },
  S: { border: "rgba(255,60,60,0.6)",   text: "#ff4040",               bar: "#ff4040"                },
};

const QuestCard = ({ rank, title, description, xp, current, total, completed = false }: QuestCardProps) => {
  const c = rankColors[rank];
  const pct = Math.min((current / total) * 100, 100);

  return (
    <div
      className="relative flex cursor-pointer items-center gap-3 overflow-hidden border bg-[rgba(0,12,32,0.8)] px-3 py-[10px] transition-all duration-200 hover:bg-[rgba(0,20,50,0.8)]"
      style={{ borderColor: completed ? "rgba(0,255,150,0.2)" : "rgba(0,180,255,0.1)" }}
    >
      {/* Left rank accent */}
      <div className="absolute bottom-0 left-0 top-0 w-[2px]" style={{ background: c.border }} />

      {/* Rank badge */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center border font-mono text-[12px] font-bold"
        style={{ borderColor: c.border, color: c.text }}
      >
        {rank}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-[0.9rem] font-semibold tracking-[0.04em] text-[#c8eeff]">{title}</div>
        <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-[rgba(0,160,200,0.45)]">{description}</div>
        <div className="mt-[6px] h-[3px] bg-[rgba(0,100,160,0.2)]">
          <div className="h-[3px] transition-all duration-500" style={{ width: `${pct}%`, background: c.bar, boxShadow: `0 0 4px ${c.bar}` }} />
        </div>
      </div>

      {/* Right */}
      <div className="flex-shrink-0 text-right">
        <div className="font-mono text-[9px] text-[#ffd700]">+{xp} XP</div>
        {completed ? (
          <div className="mt-[3px] border border-[rgba(0,255,150,0.3)] px-[6px] py-[2px] font-mono text-[7px] uppercase tracking-[0.15em] text-[#00ff96]">
            Complete
          </div>
        ) : (
          <div className="mt-[2px] font-mono text-[8px] text-[rgba(0,160,200,0.45)]">{current} / {total}</div>
        )}
      </div>
    </div>
  );
};

export default QuestCard;