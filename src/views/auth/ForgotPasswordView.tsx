import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordViewModel } from "../../viewmodels/auth/ForgotPasswordViewModel";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthNotification from "../../components/auth/AuthNotification";
import AuthField from "../../components/auth/AuthField";
import AuthDivider from "../../components/auth/AuthDivider";
import AuthChevrons from "../../components/auth/AuthChevrons";
import AuthStyles, { inputClass } from "../../components/auth/AuthStyles";

const ForgotPasswordView = () => {
  const [email, setEmail] = useState("");
  const { loading, sendResetLink } = useForgotPasswordViewModel();
  const navigate = useNavigate();

  const [notifStage, setNotifStage] = useState<"idle" | "sent" | "redirecting">("idle");
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await sendResetLink(email);
    if (!success) return;

    setNotifStage("sent");
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setNotifStage("redirecting");
        setVisible(true);
        setCountdown(3);
        let current = 3;
        const interval = setInterval(() => {
          current -= 1;
          setCountdown(current);
          if (current <= 0) {
            clearInterval(interval);
            navigate("/login");
          }
        }, 1000);
      }, 400);
    }, 3000);
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

        <AuthNotification stage={notifStage} visible={visible} countdown={countdown} />

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
        {notifStage === "idle" && (
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