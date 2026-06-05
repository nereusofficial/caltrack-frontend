import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordViewModel } from "../../viewmodels/auth/ResetPasswordViewModel";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthField from "../../components/auth/AuthField";
import AuthDivider from "../../components/auth/AuthDivider";
import AuthChevrons from "../../components/auth/AuthChevrons";
import AuthStyles, { inputClass } from "../../components/auth/AuthStyles";
import AuthError from "../../components/auth/AuthError";

const ResetPasswordView = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { loading, error, changePassword } = useResetPasswordViewModel();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [matchError, setMatchError] = useState("");

  const [done, setDone] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Replace the useEffect that runs when `done` changes:

useEffect(() => {
  if (!done) return;

  const fadeIn = setTimeout(() => setSuccessVisible(true), 10);

  // After 3s: fade out green, then fade in blue — only THEN start the countdown
  const swap = setTimeout(() => {
    setSuccessVisible(false);

    setTimeout(() => {
      setClosingVisible(true);

      // Wait for blue notif to fully fade in (~400ms), then start countdown
      setTimeout(() => {
        let current = 3;
        const interval = setInterval(() => {
          current--;
          setCountdown(current);
          if (current <= 0) {
            clearInterval(interval);
            try { window.close(); } catch { /* ignore */ }
          }
        }, 1000);
      }, 400); // matches the CSS transition duration

    }, 400);
  }, 3000);

  return () => {
    clearTimeout(fadeIn);
    clearTimeout(swap);
  };
}, [done]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMatchError("");

    if (password !== confirm) {
      setMatchError("Access keys do not match. Re-enter.");
      return;
    }

    const success = await changePassword(token, password);
    if (!success) return;

    setDone(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010b16] p-8">
      <AuthCanvas />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />

      <AuthPanel maxWidth="max-w-[460px]">

        {/* Green success notification */}
        <div style={{
          maxHeight: successVisible ? "90px" : "0px",
          opacity: successVisible ? 1 : 0,
          transform: successVisible ? "translateY(0)" : "translateY(-8px)",
          marginBottom: successVisible ? undefined : "0px",
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
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff96]">Password Reset Successful</p>
                <p className="font-mono text-[9px] text-[rgba(0,255,150,0.5)]">Your access key has been overridden successfully.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blue closing notification */}
        <div style={{
          maxHeight: closingVisible ? "90px" : "0px",
          opacity: closingVisible ? 1 : 0,
          transform: closingVisible ? "translateY(0)" : "translateY(-8px)",
          marginBottom: closingVisible ? undefined : "0px",
          overflow: "hidden",
          transition: "opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, margin-bottom 0.4s ease",
        }}>
          <div className="mb-4 border border-[rgba(0,180,255,0.35)] px-4 py-3"
            style={{ background: "rgba(0,100,200,0.1)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 animate-pulse items-center justify-center rounded-full border-2 border-[rgba(0,180,255,0.7)] font-mono text-sm text-[#00c8ff]"
                style={{ boxShadow: "0 0 10px rgba(0,180,255,0.3)" }}>
                ✕
              </div>
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5ce8ff]">Session Terminating</p>
                <p className="font-mono text-[9px] text-[rgba(0,180,255,0.5)]">
                  Page closing in{" "}
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
          </div>
        </div>

        <AuthError error={matchError || error} />

        {/* Top tick marks */}
        <div className="mb-4 flex items-center justify-center gap-1">
          <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
          <span className="px-2 font-mono text-[9px] tracking-[0.3em] text-[rgba(0,200,255,0.4)]">SYS-RECOVERY</span>
          <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
        </div>

        {/* Title */}
        <div className="mb-1 text-center font-mono text-[9px] tracking-[0.35em] text-[rgba(0,180,255,0.35)]">
          SYSTEM ID: CAL-9821-X // CREDENTIAL OVERRIDE
        </div>
        <h1 className="mb-1 text-center text-5xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}>
          Cal<span className="font-semibold text-[#00d4ff]">Track</span>
        </h1>
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
          Access Key Override Protocol
        </p>

        <AuthDivider label="NEW ACCESS KEY" />

        {/* Form — hidden once done */}
        {!done && (
          <form onSubmit={onSubmit} className="mt-6 space-y-7">
            <AuthField num="01" label="New Access Key">
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
                KEY
              </span>
            </AuthField>

            <AuthField num="02" label="Confirm Access Key">
              <input
                type="password"
                placeholder="••••••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className={inputClass}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
                KEY
              </span>
              <p className="mt-2 font-mono text-[9px] tracking-[0.1em] text-[rgba(0,140,180,0.4)]">
                Re-enter your new access key to confirm the override.
              </p>
            </AuthField>

            <AuthChevrons />

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden border border-[rgba(0,200,255,0.5)] py-4 font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#7dd8ff] transition-all duration-300 hover:border-[rgba(0,220,255,0.8)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: "linear-gradient(180deg, rgba(0,100,200,0.15), rgba(0,60,140,0.1))" }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.12),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-[rgba(0,200,255,0.4)]">[</span>
                {loading ? "Overriding..." : "Confirm Key Override"}
                <span className="text-[rgba(0,200,255,0.4)]">]</span>
              </span>
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-[rgba(0,120,180,0.15)] pt-4">
          <span className="font-mono text-[9px] tracking-[0.1em] text-[rgba(0,140,180,0.4)]">
            Token-authenticated session
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[rgba(0,140,200,0.25)]">
            CAL-SYS // OVERRIDE
          </span>
        </div>

      </AuthPanel>

      <AuthStyles />
    </div>
  );
};

export default ResetPasswordView;