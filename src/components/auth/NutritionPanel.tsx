import SectionLabel from "./SectionLabel";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  glow: string;
}

const MacroBar = ({ label, current, target, color, glow }: MacroBarProps) => {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div className="mb-[10px] last:mb-0">
      <div className="mb-[5px] flex justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[rgba(0,160,200,0.45)]">
          {label}
        </span>
        <span className="font-mono text-[8px] text-[rgba(0,180,255,0.5)]">
          {current} / {target}g
        </span>
      </div>
      <div className="h-[3px] bg-[rgba(0,100,160,0.2)]">
        <div
          className="h-[3px] rounded-[1px] transition-all duration-500"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 4px ${glow}` }}
        />
      </div>
    </div>
  );
};

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

const NutritionPanel = () => (
  <div>
    <SectionLabel label="Today's Nutrition" />
    <div className="relative border border-[rgba(0,180,255,0.15)] bg-[rgba(1,16,38,0.92)] px-5 py-5">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(0,200,255,0.35),transparent)",
        }}
      />
      <div className="flex items-center gap-6">
        {/* Calorie ring */}
        <div className="flex-shrink-0">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="rgba(0,100,160,0.2)"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="#00c8ff"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ filter: "drop-shadow(0 0 5px rgba(0,200,255,0.6))" }}
            />
            <text
              x="50" y="47"
              textAnchor="middle"
              fill="#c8eeff"
              fontSize="14"
              fontFamily="Rajdhani"
              fontWeight="600"
            >
              {calories.current.toLocaleString()}
            </text>
            <text
              x="50" y="60"
              textAnchor="middle"
              fill="rgba(0,180,255,0.45)"
              fontSize="9"
              fontFamily="Share Tech Mono"
            >
              kcal
            </text>
          </svg>
        </div>

        {/* Macro bars */}
        <div className="min-w-0 flex-1">
          <MacroBar label="Protein" current={macros.protein.current} target={macros.protein.target} color="#00ff96" glow="rgba(0,255,150,0.5)" />
          <MacroBar label="Carbs"   current={macros.carbs.current}   target={macros.carbs.target}   color="#00c8ff" glow="rgba(0,200,255,0.4)" />
          <MacroBar label="Fats"    current={macros.fats.current}    target={macros.fats.target}    color="#ffd700" glow="rgba(255,215,0,0.35)" />

          <div className="mt-3 flex items-center justify-between border-t border-[rgba(0,180,255,0.08)] pt-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[rgba(0,140,180,0.4)]">
              Remaining
            </span>
            <span className="font-mono text-[9px] text-[#00c8ff]">
              {(calories.target - calories.current).toLocaleString()} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NutritionPanel;