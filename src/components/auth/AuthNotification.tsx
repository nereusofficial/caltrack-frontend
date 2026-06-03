import { useEffect, useState } from "react";

type NotifStage = "idle" | "auth" | "sent" | "redirecting";

interface AuthNotificationProps {
  stage: NotifStage;
  visible: boolean;
  countdown: number;
}

const AuthNotification = ({ stage, visible, countdown }: AuthNotificationProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (stage !== "idle") {
      setMounted(true);
    } else {
      // Unmount after fade-out completes
      const t = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (!mounted) return null;

  const isSuccess = stage === "auth" || stage === "sent";

  return (
    <div
      style={{
        maxHeight: visible ? "80px" : "0px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        marginBottom: visible ? undefined : "0px",
        overflow: "hidden",
        transition: "opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, margin-bottom 0.4s ease",
      }}
    >
      <div
        className="mb-4 border px-4 py-3"
        style={{
          background: isSuccess ? "rgba(0,180,80,0.08)" : "rgba(0,100,200,0.1)",
          borderColor: isSuccess ? "rgba(0,255,150,0.4)" : "rgba(0,180,255,0.35)",
        }}
      >
        {isSuccess ? (
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-[rgba(0,255,150,0.7)] font-mono text-sm text-[#00ff96]"
              style={{ boxShadow: "0 0 10px rgba(0,255,150,0.3)" }}>
              ✓
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff96]">
                {stage === "auth" ? "Authentication Successful" : "Verification Email Sent"}
              </p>
              <p className="font-mono text-[9px] text-[rgba(0,255,150,0.5)]">
                {stage === "auth" ? "Identity verified — access granted" : "Check your inbox and click the verification link."}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 flex-shrink-0 animate-pulse items-center justify-center rounded-full border-2 border-[rgba(0,180,255,0.7)] font-mono text-sm text-[#00c8ff]"
              style={{ boxShadow: "0 0 10px rgba(0,180,255,0.3)" }}>
              ⟳
            </div>
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5ce8ff]">
                Redirecting to Gate
              </p>
              <p className="font-mono text-[9px] text-[rgba(0,180,255,0.5)]">
                Returning to login in{" "}
                <span className="text-[#00c8ff]" style={{ textShadow: "0 0 8px rgba(0,200,255,0.6)" }}>
                  {countdown}s
                </span>
              </p>
            </div>
            <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0">
              <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(0,120,200,0.2)" strokeWidth="2" />
              <circle cx="16" cy="16" r="13" fill="none" stroke="#00c8ff" strokeWidth="2"
                strokeDasharray={`${(countdown / 3) * 81.7} 81.7`}
                strokeLinecap="round"
                transform="rotate(-90 16 16)"
                style={{ filter: "drop-shadow(0 0 4px rgba(0,200,255,0.6))", transition: "stroke-dasharray 0.9s linear" }}
              />
              <text x="16" y="20" textAnchor="middle" fill="#00c8ff" fontSize="10" fontFamily="monospace">
                {countdown}
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthNotification;