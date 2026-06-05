import SectionLabel from "./SectionLabel";

interface Exercise {
  name: string;
  sets: string;
}

const exercises: Exercise[] = [
  { name: "Push-ups",          sets: "3×15"  },
  { name: "Squats",            sets: "3×20"  },
  { name: "Plank",             sets: "3×45s" },
  { name: "Jumping Jacks",     sets: "3×30"  },
  { name: "Mountain Climbers", sets: "3×20"  },
];

const WorkoutPanel = () => (
  <div className="flex flex-col h-full">
    <SectionLabel label="Today's Assigned Workout" />
    <div
      className="relative flex flex-col flex-1 px-5 py-4"
      style={{
        border: "1px solid rgba(255,215,0,0.15)",
        background: "rgba(20,14,0,0.5)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(255,215,0,0.3),transparent)",
        }}
      />

      {/* Header */}
      <div className="mb-3 flex items-center gap-3 flex-shrink-0">
        <span
          className="font-mono text-[8px] uppercase tracking-[0.2em]"
          style={{
            border: "1px solid rgba(255,215,0,0.35)",
            color: "rgba(255,215,0,0.7)",
            padding: "3px 8px",
          }}
        >
          E-Rank Mission
        </span>
        <span className="flex-1 text-[1rem] font-semibold tracking-[0.06em] text-[#c8eeff]">
          Full Body Circuit
        </span>
        <span className="font-mono text-[9px] text-[#ffd700]">+60 XP</span>
      </div>

      {/* Exercise list — grows to fill space */}
      <div className="flex flex-col gap-[5px] flex-1">
        {exercises.map(({ name, sets }, i) => (
          <div
            key={name}
            className="flex items-center gap-3 px-3 py-2 flex-1"
            style={{
              border: "1px solid rgba(0,180,255,0.07)",
              background: "rgba(0,15,40,0.5)",
            }}
          >
            <span className="w-5 font-mono text-[9px] text-[rgba(0,140,180,0.3)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-[0.88rem] text-[rgba(180,220,255,0.85)]">
              {name}
            </span>
            <span className="font-mono text-[9px] text-[rgba(0,200,255,0.55)]">
              {sets}
            </span>
          </div>
        ))}
      </div>

      {/* Start button — pinned to bottom */}
      <button className="group relative mt-3 w-full overflow-hidden border border-[rgba(0,200,255,0.3)] bg-[rgba(0,80,160,0.1)] py-[9px] font-mono text-[9px] uppercase tracking-[0.4em] text-[#7dd8ff] transition-all duration-300 hover:border-[rgba(0,220,255,0.6)] hover:text-[#c8f4ff] flex-shrink-0">
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.1),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
        [ Start Workout ]
      </button>
    </div>
  </div>
);

export default WorkoutPanel;