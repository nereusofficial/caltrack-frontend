interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  color: string;
  glow: string;
}

const MacroBar = ({ label, current, target, unit = "g", color, glow }: MacroBarProps) => {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div className="mb-[8px]">
      <div className="mb-[2px] font-mono text-[7px] uppercase tracking-[0.25em] text-[rgba(0,160,200,0.4)]">
        {label}
      </div>
      <div className="h-[4px] bg-[rgba(0,100,160,0.2)]">
        <div
          className="h-[4px] transition-all duration-500"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 4px ${glow}` }}
        />
      </div>
      <div className="mt-[2px] flex justify-between">
        <span className="font-mono text-[8px]" style={{ color }}>{current}{unit}</span>
        <span className="font-mono text-[8px] text-[rgba(140,200,255,0.4)]">/ {target}{unit}</span>
      </div>
    </div>
  );
};

export default MacroBar;