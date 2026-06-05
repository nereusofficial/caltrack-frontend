const stats = [
  { key: "Calories", val: "1,840", unit: "/ 2,200 kcal", color: "#00c8ff" },
  { key: "Protein",  val: "142g",  unit: "/ 160g",        color: "#00ff96" },
  { key: "Streak",   val: "7 Days 🔥", unit: "Personal best: 12", color: "#ffd700" },
];

/** Three separate small stat boxes in a row — matches sketch top-left */
const StatusWindow = () => (
  <>
    {stats.map(({ key, val, unit, color }) => (
      <div key={key} className="relative border border-[rgba(0,180,255,0.15)] bg-[rgba(1,16,38,0.92)] px-5 py-4 flex-1">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.35),transparent)" }}
        />
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[rgba(0,160,200,0.45)]">
          {key}
        </div>
        <div className="mt-1 text-[1.6rem] font-semibold leading-none" style={{ color }}>
          {val}
        </div>
        <div className="mt-1 font-mono text-[9px] text-[rgba(0,140,180,0.45)]">
          {unit}
        </div>
      </div>
    ))}
  </>
);

export default StatusWindow;