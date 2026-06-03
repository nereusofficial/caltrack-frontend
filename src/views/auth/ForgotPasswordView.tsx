import { useState } from "react";
import { Link } from "react-router-dom";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthField from "../../components/auth/AuthField";
import AuthDivider from "../../components/auth/AuthDivider";
import AuthChevrons from "../../components/auth/AuthChevrons";
import AuthStyles, { inputClass } from "../../components/auth/AuthStyles";

const ForgotPasswordView = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentVisible, setSentVisible] = useState(false);
  const [sentMounted, setSentMounted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Backend integration here
    setTimeout(() => {
      setLoading(false);
      // Mount then fade in
      setSentMounted(true);
      setTimeout(() => setSentVisible(true), 10);
    }, 1500);
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

        {/* Success notification — fades in, never fades out (stays until user navigates) */}
        {sentMounted && (
          <div style={{
            maxHeight: sentVisible ? "90px" : "0px",
            opacity: sentVisible ? 1 : 0,
            transform: sentVisible ? "translateY(0)" : "translateY(-8px)",
            marginBottom: sentVisible ? undefined : "0px",
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff96]">Transmission Sent</p>
                  <p className="font-mono text-[9px] tracking-[0.1em] text-[rgba(0,255,150,0.5)]">
                    Reset link dispatched to <span className="text-[#00ff96]">{email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
          SYSTEM ID: CAL-9821-X // CREDENTIAL RESET
        </div>
        <h1 className="mb-1 text-center text-5xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}>
          Cal<span className="font-semibold text-[#00d4ff]">Track</span>
        </h1>
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
          Recovery Protocol Active
        </p>

        <AuthDivider label="HUNTER ID REQUIRED" />

        {/* Form — hide after sent */}
        {!sentMounted && (
          <form onSubmit={onSubmit} className="mt-6 space-y-7">
            <AuthField num="01" label="Hunter ID (Email)">
              <input
                type="email"
                placeholder="hunter@caltrack.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
                EMAIL
              </span>
              <p className="mt-2 font-mono text-[9px] tracking-[0.1em] text-[rgba(0,140,180,0.4)]">
                A reset transmission will be dispatched to this address.
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
                {loading ? "Transmitting..." : "Send Reset Link"}
                <span className="text-[rgba(0,200,255,0.4)]">]</span>
              </span>
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-[rgba(0,120,180,0.15)] pt-4">
          <Link
            to="/login"
            className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] text-[rgba(0,140,180,0.5)] transition-all hover:text-[#5ce8ff]"
            style={{ textShadow: "none" }}
            onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 8px rgba(0,200,255,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.textShadow = "none")}
          >
            <span>⟨</span><span>Return to Gate</span>
          </Link>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[rgba(0,140,200,0.25)]">
            CAL-SYS // RECOVERY
          </span>
        </div>

      </AuthPanel>

      <AuthStyles />
    </div>
  );
};

export default ForgotPasswordView;