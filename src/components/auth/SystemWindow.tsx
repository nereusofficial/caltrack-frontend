import React from "react";

interface SystemWindowProps {
  title: string;
  children: React.ReactNode;
}

const SystemWindow = ({ title, children }: SystemWindowProps) => (
  <div className="relative overflow-hidden border border-[rgba(0,180,255,0.2)] bg-[rgba(1,16,38,0.9)]">
    {/* Top glow line */}
    <div className="absolute inset-x-0 top-0 h-px"
      style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.4),transparent)" }} />

    {/* Header */}
    <div className="flex items-center gap-[10px] border-b border-[rgba(0,180,255,0.08)] px-[14px] py-[10px]">
      <div className="flex h-7 w-7 items-center justify-center border border-[rgba(0,200,255,0.5)] text-[14px] text-[#00d4ff]">
        <i className="ti ti-alert-circle" aria-hidden="true" />
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#5ce8ff]">
        Notification — {title}
      </span>
    </div>

    <div className="px-[14px] py-[12px]">
      {children}
    </div>
  </div>
);

export default SystemWindow;