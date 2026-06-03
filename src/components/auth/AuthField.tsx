import React from "react";

interface AuthFieldProps {
  num: string;
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}

const AuthField = ({ num, label, children, compact = false }: AuthFieldProps) => (
  <div>
    <div className={`${compact ? "mb-1" : "mb-2"} flex items-center gap-1.5`}>
      <span className={`font-mono ${compact ? "text-[8px]" : "text-[9px]"} text-[rgba(0,180,255,0.3)]`}>{num}</span>
      <span className={`font-mono ${compact ? "text-[9px]" : "text-[10px]"} uppercase ${compact ? "tracking-[0.3em]" : "tracking-[0.35em]"} text-[#00b4ff]`}>{label}</span>
    </div>
    <div className="relative">
      <div className={`pointer-events-none absolute -left-px -top-px ${compact ? "h-1.5 w-1.5" : "h-2 w-2"} border-l border-t border-[rgba(0,200,255,0.5)]`} />
      <div className={`pointer-events-none absolute -bottom-px -right-px ${compact ? "h-1.5 w-1.5" : "h-2 w-2"} border-b border-r border-[rgba(0,200,255,0.5)]`} />
      {children}
    </div>
  </div>
);

export default AuthField;