import React from "react";

interface AuthPanelProps {
  children: React.ReactNode;
  maxWidth?: string;
  compact?: boolean;
}

const AuthPanel = ({ children, maxWidth = "max-w-[500px]", compact = false }: AuthPanelProps) => (
  <div className={`relative z-10 w-full ${maxWidth}`}>
    <div className="pointer-events-none absolute -inset-3 border border-[rgba(0,160,255,0.12)]" />
    <div className="pointer-events-none absolute -inset-5 border border-[rgba(0,160,255,0.06)]" />

    <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#00c8ff]"
      style={{ boxShadow: "-2px -2px 12px rgba(0,200,255,0.4), inset -2px -2px 8px rgba(0,200,255,0.1)" }} />
    <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#00c8ff]"
      style={{ boxShadow: "2px -2px 12px rgba(0,200,255,0.4), inset 2px -2px 8px rgba(0,200,255,0.1)" }} />
    <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#00c8ff]"
      style={{ boxShadow: "-2px 2px 12px rgba(0,200,255,0.4), inset -2px 2px 8px rgba(0,200,255,0.1)" }} />
    <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#00c8ff]"
      style={{ boxShadow: "2px 2px 12px rgba(0,200,255,0.4), inset 2px 2px 8px rgba(0,200,255,0.1)" }} />

    <div className="pointer-events-none absolute inset-0 border border-[rgba(0,180,255,0.18)]"
      style={{ boxShadow: "0 0 60px rgba(0,120,255,0.25), 0 0 120px rgba(0,80,255,0.1), inset 0 0 60px rgba(0,0,30,0.8)" }} />
    <div className="pointer-events-none absolute inset-x-0 z-20 h-px animate-[scanline_4s_linear_infinite]"
      style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.08), transparent)" }} />

    <div className={`relative overflow-y-auto ${compact ? "px-5 py-5 sm:px-8 sm:py-6" : "px-5 py-6 sm:px-10 sm:py-9"}`}
      style={{ background: "linear-gradient(180deg, rgba(1,18,38,0.95) 0%, rgba(1,12,28,0.98) 100%)", backdropFilter: "blur(24px)" }}>
      {children}
    </div>
  </div>
);

export default AuthPanel;