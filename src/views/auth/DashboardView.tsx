import DashboardLayout from "../../components/auth/DashboardLayout";
import SystemWindow from "../../components/auth/SystemWindow";
import SectionLabel from "../../components/auth/SectionLabel";
import QuestCard from "../../components/auth/QuestCard";
import MacroBar from "../../components/auth/MacroBar";

const DashboardView = () => {
  const calories = { current: 1840, target: 2200 };
  const macros = {
    protein: { current: 142, target: 160 },
    carbs:   { current: 180, target: 250 },
    fats:    { current: 42,  target: 72  },
  };

  const r = 38;
  const circumference = 2 * Math.PI * r;
  const calPct = calories.current / calories.target;
  const offset = circumference - calPct * circumference;

  const workoutExercises = [
    { name: "Push-ups",           sets: "3×15"  },
    { name: "Squats",             sets: "3×20"  },
    { name: "Plank",              sets: "3×45s" },
    { name: "Jumping Jacks",      sets: "3×30"  },
    { name: "Mountain Climbers",  sets: "3×20"  },
  ];

  const aiMessages = [
    {
      icon: "ti-robot",
      label: "AI Advisor",
      labelColor: "rgba(0,200,255,0.5)",
      border: "rgba(0,200,255,0.15)",
      bg: "rgba(0,25,60,0.6)",
      textColor: "rgba(160,210,255,0.8)",
      text: "You're 18g short on protein today. Add Greek yogurt or cottage cheese before bed to hit your target.",
      highlight: null,
    },
    {
      icon: "ti-star",
      label: "Rank Tip",
      labelColor: "rgba(255,215,0,0.5)",
      border: "rgba(255,215,0,0.12)",
      bg: "rgba(30,22,0,0.5)",
      textColor: "rgba(255,230,150,0.75)",
      text: "Complete Protein Warrior tomorrow to unlock D-Rank and new workout tiers.",
      highlight: "Protein Warrior",
    },
    {
      icon: "ti-alert-triangle",
      label: "Warning",
      labelColor: "rgba(255,90,90,0.5)",
      border: "rgba(255,90,90,0.12)",
      bg: "rgba(40,5,5,0.4)",
      textColor: "rgba(255,180,180,0.75)",
      text: "Fiber intake is at 40% of goal. Add leafy greens or legumes to your next meal.",
      highlight: null,
    },
  ];

  return (
    <DashboardLayout>

      {/* ── Status Window — full width ── */}
      <div>
        <SectionLabel label="Status Window" />
        <SystemWindow title="Daily Status">
          <div className="flex items-center gap-12">
            {[
              { key: "Calories", val: calories.current.toLocaleString(), unit: `/ ${calories.target.toLocaleString()} kcal`, color: "#00c8ff" },
              { key: "Protein",  val: `${macros.protein.current}g`,      unit: `/ ${macros.protein.target}g`,                color: "#00ff96" },
              { key: "Streak",   val: "7 Days 🔥",                       unit: "Personal best: 12",                          color: "#ffd700" },
            ].map(({ key, val, unit, color }, i) => (
              <div key={key} className={`${i > 0 ? "border-l border-[rgba(0,180,255,0.1)] pl-12" : ""}`}>
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[rgba(0,160,200,0.45)]">{key}</div>
                <div className="mt-1 text-[1.6rem] font-semibold leading-none" style={{ color }}>{val}</div>
                <div className="mt-1 font-mono text-[9px] text-[rgba(0,140,180,0.45)]">{unit}</div>
              </div>
            ))}
          </div>
        </SystemWindow>
      </div>

      {/* ── Row 2: Nutrition (left) + Quests (right) ── */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1.3fr" }}>

        {/* Nutrition */}
        <div>
          <SectionLabel label="Today's Nutrition" />
          <div className="relative border border-[rgba(0,180,255,0.15)] bg-[rgba(1,16,38,0.92)] px-5 py-5">
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.35),transparent)" }} />
            <div className="flex items-center gap-6">
              {/* Ring */}
              <div className="flex-shrink-0">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,100,160,0.2)" strokeWidth="8" />
                  <circle cx="50" cy="50" r={r} fill="none" stroke="#00c8ff" strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ filter: "drop-shadow(0 0 5px rgba(0,200,255,0.6))" }}
                  />
                  <text x="50" y="47" textAnchor="middle" fill="#c8eeff" fontSize="14" fontFamily="Rajdhani" fontWeight="600">
                    {calories.current.toLocaleString()}
                  </text>
                  <text x="50" y="60" textAnchor="middle" fill="rgba(0,180,255,0.45)" fontSize="9" fontFamily="Share Tech Mono">
                    kcal
                  </text>
                </svg>
              </div>
              {/* Bars */}
              <div className="flex-1 min-w-0">
                <MacroBar label="Protein" current={macros.protein.current} target={macros.protein.target} color="#00ff96" glow="rgba(0,255,150,0.5)" />
                <MacroBar label="Carbs"   current={macros.carbs.current}   target={macros.carbs.target}   color="#00c8ff" glow="rgba(0,200,255,0.4)" />
                <MacroBar label="Fats"    current={macros.fats.current}    target={macros.fats.target}    color="#ffd700" glow="rgba(255,215,0,0.35)" />
                <div className="mt-3 flex items-center justify-between border-t border-[rgba(0,180,255,0.08)] pt-2">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[rgba(0,140,180,0.4)]">Remaining</span>
                  <span className="font-mono text-[9px] text-[#00c8ff]">{(calories.target - calories.current).toLocaleString()} kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quests */}
        <div>
          <SectionLabel label="Active Quests" />
          <div className="flex flex-col gap-2">
            <QuestCard rank="D" title="Protein Warrior" description="Hit 160g protein for 3 consecutive days" xp={150} current={2} total={3} />
            <QuestCard rank="E" title="Log Every Meal"  description="Log all meals for 7 days"                xp={80}  current={7} total={7} completed />
            <QuestCard rank="C" title="Calorie Deficit" description="Stay under calorie target for 5 days"    xp={300} current={2} total={5} />
          </div>
        </div>
      </div>

      {/* ── Row 3: Workout (left) + AI Messages (right) ── */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1.3fr" }}>

        {/* Workout */}
        <div>
          <SectionLabel label="Today's Assigned Workout" />
          <div className="relative border border-[rgba(255,215,0,0.15)] bg-[rgba(20,14,0,0.5)] px-5 py-4">
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,215,0,0.3),transparent)" }} />
            <div className="mb-3 flex items-center gap-3">
              <span className="border border-[rgba(255,215,0,0.35)] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[rgba(255,215,0,0.7)]">
                E-Rank Mission
              </span>
              <span className="text-[1rem] font-semibold tracking-[0.06em] text-[#c8eeff]">Full Body Circuit</span>
              <span className="ml-auto font-mono text-[9px] text-[#ffd700]">+60 XP</span>
            </div>
            <div className="flex flex-col gap-[5px]">
              {workoutExercises.map(({ name, sets }, i) => (
                <div key={name} className="flex items-center gap-3 border border-[rgba(0,180,255,0.07)] bg-[rgba(0,15,40,0.5)] px-3 py-2">
                  <span className="w-5 font-mono text-[9px] text-[rgba(0,140,180,0.3)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[0.88rem] text-[rgba(180,220,255,0.85)]">{name}</span>
                  <span className="font-mono text-[9px] text-[rgba(0,200,255,0.55)]">{sets}</span>
                </div>
              ))}
            </div>
            <button className="group relative mt-3 w-full overflow-hidden border border-[rgba(0,200,255,0.3)] bg-[rgba(0,80,160,0.1)] py-[9px] font-mono text-[9px] uppercase tracking-[0.4em] text-[#7dd8ff] transition-all duration-300 hover:border-[rgba(0,220,255,0.6)] hover:text-[#c8f4ff]">
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.1),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
              [ Start Workout ]
            </button>
          </div>
        </div>

        {/* AI Messages */}
        <div>
          <SectionLabel label="System Messages" />
          <div className="flex flex-col gap-3">
            {aiMessages.map(({ icon, label, labelColor, border, bg, textColor, text, highlight }) => (
              <div key={label}
                className="relative flex gap-3 px-4 py-3"
                style={{ border: `1px solid ${border}`, background: bg }}
              >
                <div className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg,transparent,${border.replace("0.1", "0.4").replace("0.12", "0.4").replace("0.15", "0.4")},transparent)` }} />
                <div className="mt-[2px] flex h-7 w-7 flex-shrink-0 items-center justify-center border text-[14px]"
                  style={{ borderColor: labelColor, color: labelColor }}>
                  <i className={`ti ${icon}`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-[3px] font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: labelColor }}>
                    {label}
                  </div>
                  <p className="text-[0.85rem] leading-relaxed" style={{ color: textColor }}>
                    {highlight
                      ? text.split(highlight).map((part, i, arr) => (
                          <span key={i}>{part}{i < arr.length - 1 && <span style={{ color: "#ffd700" }}>{highlight}</span>}</span>
                        ))
                      : text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default DashboardView;