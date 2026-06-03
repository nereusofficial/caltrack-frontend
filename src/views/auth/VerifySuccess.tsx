import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthStyles from "../../components/auth/AuthStyles";

const VerifySuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);
  const [notifVisible, setNotifVisible] = useState(false);
  const [redirectVisible, setRedirectVisible] = useState(false);

  useEffect(() => {
    // Fade in success notification on mount
    const fadeIn = setTimeout(() => setNotifVisible(true), 10);

    let current = 7;
    const interval = setInterval(() => {
      current--;
      setCountdown(current);
      if (current <= 0) {
        clearInterval(interval);
        try { window.close(); } catch { /* ignore */ }
        setTimeout(() => navigate("/login"), 100);
      }
    }, 1000);

    // After 3s fade out green, fade in blue redirecting
    const swap = setTimeout(() => {
      setNotifVisible(false);
      setTimeout(() => setRedirectVisible(true), 300);
    }, 3000);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(swap);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010b16] p-8">
      <AuthCanvas />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />

      <AuthPanel>

        {/* Green success notification */}
        <div style={{
          maxHeight: notifVisible ? "90px" : "0px",
          opacity: notifVisible ? 1 : 0,
          transform: notifVisible ? "translateY(0)" : "translateY(-8px)",
          marginBottom: notifVisible ? undefined : "0px",
          overflow: "hidden",
          transition: "opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, margin-bottom 0.4s ease",
        }}>
          <div className="mb-4 border border-[rgba(0,255,150,0.4)] px-4 py-3"
            style={{ background: "rgba(0,180,80,0.08)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-[rgba(0,255,150,0.7)] font-mono text-sm text-[#00ff96]"
                style={{ boxShadow: "0 0 10px rgba(0,255,150,0.3)" }}>
                ✓
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff96]">Account Verified</p>
                <p className="font-mono text-[9px] text-[rgba(0,255,150,0.5)]">Your account has been successfully activated.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blue redirecting notification */}
        <div style={{
          maxHeight: redirectVisible ? "90px" : "0px",
          opacity: redirectVisible ? 1 : 0,
          transform: redirectVisible ? "translateY(0)" : "translateY(-8px)",
          marginBottom: redirectVisible ? undefined : "0px",
          overflow: "hidden",
          transition: "opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, margin-bottom 0.4s ease",
        }}>
          <div className="mb-4 border border-[rgba(0,180,255,0.35)] px-4 py-3"
            style={{ background: "rgba(0,100,200,0.1)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 animate-pulse items-center justify-center rounded-full border-2 border-[rgba(0,180,255,0.7)] font-mono text-sm text-[#00c8ff]"
                style={{ boxShadow: "0 0 10px rgba(0,180,255,0.3)" }}>
                ⟳
              </div>
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5ce8ff]">Redirecting to Gate</p>
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
                  strokeDasharray={`${(countdown / 7) * 81.7} 81.7`}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                  style={{ filter: "drop-shadow(0 0 4px rgba(0,200,255,0.6))", transition: "stroke-dasharray 0.9s linear" }}
                />
                <text x="16" y="20" textAnchor="middle" fill="#00c8ff" fontSize="10" fontFamily="monospace">
                  {countdown}
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Top tick marks */}
        <div className="mb-4 flex items-center justify-center gap-1">
          <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
          <span className="px-2 font-mono text-[9px] tracking-[0.3em] text-[rgba(0,200,255,0.4)]">SYS-VERIFY</span>
          <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
        </div>

        {/* Title */}
        <div className="mb-1 text-center font-mono text-[9px] tracking-[0.35em] text-[rgba(0,180,255,0.35)]">
          SYSTEM ID: CAL-9821-X // IDENTITY CONFIRMATION
        </div>
        <h1 className="mb-1 text-center text-5xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}>
          Cal<span className="font-semibold text-[#00d4ff]">Track</span>
        </h1>
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
          Verification Protocol Complete
        </p>

        {/* Big checkmark */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[rgba(0,255,150,0.2)]"
              style={{ boxShadow: "0 0 20px rgba(0,255,150,0.1)" }} />
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border border-[rgba(0,255,150,0.3)]" />
            {/* Icon */}
            <span className="relative text-3xl text-[#00ff96]"
              style={{ textShadow: "0 0 20px rgba(0,255,150,0.8), 0 0 40px rgba(0,255,150,0.4)" }}>
              ✓
            </span>
          </div>
        </div>

        {/* Status message */}
        <div className="flex items-center gap-2 border border-[rgba(0,180,255,0.2)] px-4 py-3"
          style={{ background: "rgba(0,100,200,0.06)" }}>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(0,180,255,0.4)]">Status</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00c8ff]">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(0,180,255,0.4)]">Rank</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(0,200,255,0.6)]">E-Class Hunter</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(0,180,255,0.4)]">Access</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(0,200,255,0.6)]">Granted</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between border-t border-[rgba(0,120,180,0.15)] pt-4">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[rgba(0,140,200,0.25)]">
            CAL-SYS // GATE CLASS: E
          </span>
          <div className="flex gap-1">
            {[true, false, false, false, false].map((active, i) => (
              <div key={i} className={`h-[5px] w-[5px] rounded-full ${active ? "bg-[#00ff96]" : "bg-[rgba(0,180,255,0.15)]"}`}
                style={active ? { boxShadow: "0 0 5px rgba(0,255,150,0.6)" } : {}} />
            ))}
          </div>
        </div>

      </AuthPanel>

      <AuthStyles />
    </div>
  );
};

export default VerifySuccess;