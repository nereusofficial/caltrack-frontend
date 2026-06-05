import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthStyles from "../../components/auth/AuthStyles";
import AuthNotification from "../../components/auth/AuthNotification";

type NotifStage = "idle" | "auth" | "sent" | "redirecting" | "closing";

const VerifySuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);
  const [stage, setStage] = useState<NotifStage>("auth");
  const [notifVisible, setNotifVisible] = useState(false);

  useEffect(() => {
    // Fade in green success notification on mount
    const fadeIn = setTimeout(() => setNotifVisible(true), 10);

    // After 3s: fade out green, then fade in blue redirecting
    const swap = setTimeout(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setStage("redirecting");
        setNotifVisible(true);
      }, 400); // matches CSS transition duration
    }, 3000);

    // Countdown runs independently (visible in the blue notif once it appears)
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
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }}
      />

      <AuthPanel>
        <AuthNotification stage={stage} visible={notifVisible} countdown={countdown} />

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
        <h1
          className="mb-1 text-center text-5xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}
        >
          Cal<span className="font-semibold text-[#00d4ff]">Track</span>
        </h1>
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
          Verification Protocol Complete
        </p>

        {/* Big checkmark */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-[rgba(0,255,150,0.2)]"
              style={{ boxShadow: "0 0 20px rgba(0,255,150,0.1)" }}
            />
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border border-[rgba(0,255,150,0.3)]" />
            {/* Icon */}
            <span
              className="relative text-3xl text-[#00ff96]"
              style={{ textShadow: "0 0 20px rgba(0,255,150,0.8), 0 0 40px rgba(0,255,150,0.4)" }}
            >
              ✓
            </span>
          </div>
        </div>

        {/* Status message */}
        <div
          className="flex items-center gap-2 border border-[rgba(0,180,255,0.2)] px-4 py-3"
          style={{ background: "rgba(0,100,200,0.06)" }}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(0,180,255,0.4)]">Status</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00c8ff]">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(0,180,255,0.4)]">Rank</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(0,200,255,0.6)]">E-Class Hunter</span>
            </div>
            <div className="flex items-center justify-between">
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
              <div
                key={i}
                className={`h-[5px] w-[5px] rounded-full ${active ? "bg-[#00ff96]" : "bg-[rgba(0,180,255,0.15)]"}`}
                style={active ? { boxShadow: "0 0 5px rgba(0,255,150,0.6)" } : {}}
              />
            ))}
          </div>
        </div>
      </AuthPanel>

      <AuthStyles />
    </div>
  );
};

export default VerifySuccess;