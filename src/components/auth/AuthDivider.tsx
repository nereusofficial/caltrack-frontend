interface AuthDividerProps {
  label: string;
  compact?: boolean;
}

const AuthDivider = ({ label, compact = false }: AuthDividerProps) => (
  <div className="flex items-center gap-2">
    <div className="h-px flex-1"
      style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.25), transparent)" }} />
    <div className={`${compact ? "h-1.5 w-1.5" : "h-2 w-2"} rotate-45 border border-[rgba(0,200,255,0.5)]`}
      style={{ boxShadow: `0 0 ${compact ? "4px" : "6px"} rgba(0,200,255,0.3)` }} />
    <span className={`font-mono ${compact ? "text-[8px]" : "text-[9px]"} tracking-[0.3em] text-[rgba(0,180,255,0.4)]`}>{label}</span>
    <div className={`${compact ? "h-1.5 w-1.5" : "h-2 w-2"} rotate-45 border border-[rgba(0,200,255,0.5)]`}
      style={{ boxShadow: `0 0 ${compact ? "4px" : "6px"} rgba(0,200,255,0.3)` }} />
    <div className="h-px flex-1"
      style={{ background: "linear-gradient(270deg, transparent, rgba(0,180,255,0.25), transparent)" }} />
  </div>
);

export default AuthDivider;