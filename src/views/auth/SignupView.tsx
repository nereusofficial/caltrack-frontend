import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupViewModel } from "../../viewmodels/auth/SignupViewModel";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthNotification from "../../components/auth/AuthNotification";
import AuthDivider from "../../components/auth/AuthDivider";
import AuthField from "../../components/auth/AuthField";
import AuthChevrons from "../../components/auth/AuthChevrons";
import AuthStyles, { inputClass } from "../../components/auth/AuthStyles";
import AuthError from "../../components/auth/AuthError";

const SignupView = () => {
  const { formData, loading, error, handleChange, handleSignup, handleGoogleSignup } = useSignupViewModel();
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [notifStage, setNotifStage] = useState<"idle" | "sent" | "redirecting">("idle");
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setConfirmError("Access keys do not match.");
      return;
    }
    setConfirmError("");

    const success = await handleSignup();
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

  const handleFacebookSignup = async () => {};
  const handleAppleSignup = async () => {};

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010b16] p-4 sm:p-8">
      <AuthCanvas />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }} />

      <AuthPanel>
        <AuthNotification stage={notifStage} visible={visible} countdown={countdown} />
        <AuthError error={error} />

        <div className="mb-4 flex items-center justify-center gap-1">
          <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
          <span className="px-2 font-mono text-[9px] tracking-[0.3em] text-[rgba(0,200,255,0.4)]">SYS-AUTH</span>
          <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
          <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
        </div>

        <div className="mb-2 text-center font-mono text-[9px] tracking-[0.35em] text-[rgba(0,180,255,0.35)]">
          SYSTEM ID: CAL-9821-X // HUNTER ENROLLMENT
        </div>
        <h1 className="mb-1 text-center text-4xl sm:text-5xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}>
          Cal<span className="font-semibold text-[#00d4ff]">Track</span>
        </h1>
        <p className="mb-5 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
          Hunter Registration Protocol
        </p>

        <div className="mb-5 flex justify-center gap-2">
          {[true, true, true, false, false].map((active, i) => (
            <div key={i} className={`h-1 w-6 sm:w-8 ${active ? "bg-[rgba(0,200,255,0.6)]" : "bg-[rgba(0,100,160,0.3)]"}`}
              style={active ? { boxShadow: "0 0 6px rgba(0,200,255,0.5)" } : {}} />
          ))}
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleGoogleSignup()}
            disabled={loading || notifStage !== "idle"}
            title="Continue with Google"
            className="group relative overflow-hidden border border-[rgba(0,200,255,0.25)] py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(0,200,255,0.6)] transition-all duration-300 hover:border-[rgba(0,220,255,0.5)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(180deg, rgba(0,60,120,0.15), rgba(0,30,80,0.1))" }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.07),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex flex-col items-center justify-center gap-1.5">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="hidden sm:block">Google</span>
            </span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookSignup}
            disabled={loading || notifStage !== "idle"}
            title="Continue with Facebook"
            className="group relative overflow-hidden border border-[rgba(0,200,255,0.25)] py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(0,200,255,0.6)] transition-all duration-300 hover:border-[rgba(0,220,255,0.5)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(180deg, rgba(0,60,120,0.15), rgba(0,30,80,0.1))" }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.07),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex flex-col items-center justify-center gap-1.5">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2" />
              </svg>
              <span className="hidden sm:block">Facebook</span>
            </span>
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={handleAppleSignup}
            disabled={loading || notifStage !== "idle"}
            title="Continue with Apple"
            className="group relative overflow-hidden border border-[rgba(0,200,255,0.25)] py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(0,200,255,0.6)] transition-all duration-300 hover:border-[rgba(0,220,255,0.5)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(180deg, rgba(0,60,120,0.15), rgba(0,30,80,0.1))" }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.07),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex flex-col items-center justify-center gap-1.5">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="white" />
              </svg>
              <span className="hidden sm:block">Apple</span>
            </span>
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex-1 border-t border-[rgba(0,120,180,0.2)]" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-[rgba(0,140,200,0.35)]">OR</span>
          <div className="flex-1 border-t border-[rgba(0,120,180,0.2)]" />
        </div>

        <AuthDivider label="CREDENTIALS REQUIRED" />

        <form onSubmit={onSubmit} className="mt-5 space-y-6">
          <AuthField num="01" label="Hunter Identification">
            <input type="email" name="email" placeholder="hunter@caltrack.io"
              value={formData.email} onChange={handleChange} required className={inputClass} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
              EMAIL
            </span>
          </AuthField>

          <AuthField num="02" label="Access Key">
            <input type="password" name="password" placeholder="••••••••••••"
              value={formData.password} onChange={handleChange} required className={inputClass} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
              PASSWORD
            </span>
          </AuthField>

          <div className="space-y-1">
            <AuthField num="03" label="Confirm Access Key">
              <input
                type="password"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmError("");
                }}
                required
                className={inputClass}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
                CONFIRM
              </span>
            </AuthField>
            {confirmError && (
              <p className="pl-1 font-mono text-[9px] tracking-[0.15em] text-red-400">{confirmError}</p>
            )}
          </div>

          <AuthChevrons />

          <button type="submit" disabled={loading || notifStage !== "idle"}
            className="group relative w-full overflow-hidden border border-[rgba(0,200,255,0.5)] py-3 sm:py-4 font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.5em] text-[#7dd8ff] transition-all duration-300 hover:border-[rgba(0,220,255,0.8)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(180deg, rgba(0,100,200,0.15), rgba(0,60,140,0.1))" }}>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.12),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              <span className="text-[rgba(0,200,255,0.4)]">[</span>
              {loading ? "Registering Hunter..." : "Awaken & Register"}
              <span className="text-[rgba(0,200,255,0.4)]">]</span>
            </span>
          </button>
        </form>

        <div className="mt-5 flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.1em] text-[rgba(0,140,180,0.4)]">Already a Hunter?</span>
          <Link to="/login" className="font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,220,0.7)] transition-all hover:text-[#00d4ff]">
            ⟨ Return to Gate ⟩
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[rgba(0,120,180,0.15)] pt-4">
          <span className="font-mono text-[8px] tracking-[0.2em] text-[rgba(0,140,200,0.25)]">GATE CLASS: E → S</span>
          <div className="flex gap-1">
            {[true, true, true, false, false].map((active, i) => (
              <div key={i} className={`h-[5px] w-[5px] rounded-full ${active ? "bg-[#00c8ff]" : "bg-[rgba(0,180,255,0.15)]"}`}
                style={active ? { boxShadow: "0 0 5px rgba(0,200,255,0.6)" } : {}} />
            ))}
          </div>
        </div>
      </AuthPanel>

      <AuthStyles />
    </div>
  );
};

export default SignupView;