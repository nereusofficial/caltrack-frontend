import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupViewModel } from "../../viewmodels/auth/SignupViewModel";

import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthNotification from "../../components/auth/AuthNotification";
import AuthDivider from "../../components/auth/AuthDivider";
import AuthField from "../../components/auth/AuthField";
import AuthChevrons from "../../components/auth/AuthChevrons";
import AuthStyles from "../../components/auth/AuthStyles";
import AuthError from "../../components/auth/AuthError";

const fieldClass =
  "w-full border border-b-[rgba(0,180,255,0.4)] border-[rgba(0,140,220,0.2)] bg-[rgba(0,20,50,0.5)] px-3 py-2 font-sans text-sm text-[#d8f0ff] placeholder-[rgba(0,140,200,0.3)] outline-none transition-all focus:border-b-[#00d4ff] focus:bg-[rgba(0,30,70,0.6)] focus:border-[rgba(0,180,255,0.5)]";

const selectArrow = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(0,180,255,0.5)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")";

const SignupView = () => {
  const { formData, loading, error, handleChange, handleSignup } = useSignupViewModel();
  const navigate = useNavigate();

  const [notifStage, setNotifStage] = useState<"idle" | "sent" | "redirecting">("idle");
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#010b16] flex items-center justify-center px-8">
      <AuthCanvas />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />

      <AuthPanel maxWidth="max-w-[580px]" compact>
        <AuthNotification stage={notifStage} visible={visible} countdown={countdown} />
        <AuthError error={error} />

        {/* Title */}
        <div className="mb-0.5 text-center font-mono text-[8px] tracking-[0.35em] text-[rgba(0,180,255,0.35)]">
          SYSTEM ID: CAL-9821-X // HUNTER ENROLLMENT
        </div>
        <h1 className="mb-0.5 text-center text-4xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}>
          Cal<span className="font-semibold text-[#00d4ff]">Track</span>
        </h1>
        <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
          Hunter Registration Protocol
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <AuthDivider label="IDENTITY DATA" compact />

          <div className="grid grid-cols-2 gap-3">
            <AuthField num="01" label="First Name" compact>
              <input type="text" name="firstName" placeholder="Sung"
                value={formData.firstName} onChange={handleChange} required className={fieldClass} />
            </AuthField>
            <AuthField num="02" label="Last Name" compact>
              <input type="text" name="lastName" placeholder="Jin-Woo"
                value={formData.lastName} onChange={handleChange} required className={fieldClass} />
            </AuthField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <AuthField num="03" label="Hunter ID (Email)" compact>
              <input type="email" name="email" placeholder="hunter@caltrack.io"
                value={formData.email} onChange={handleChange} required className={fieldClass} />
            </AuthField>
            <AuthField num="04" label="Access Key" compact>
              <input type="password" name="password" placeholder="••••••••••••"
                value={formData.password} onChange={handleChange} required className={fieldClass} />
            </AuthField>
          </div>

          <AuthDivider label="PHYSICAL STATS" compact />

          <div className="grid grid-cols-2 gap-3">
            <AuthField num="05" label="Age" compact>
              <input type="number" name="age" placeholder="0" min={0}
                value={formData.age || ""} onChange={handleChange} required className={fieldClass} />
            </AuthField>
            <AuthField num="06" label="Gender" compact>
              <select name="gender" value={formData.gender} onChange={handleChange} required
                className={fieldClass + " cursor-pointer appearance-none"}
                style={{ backgroundImage: selectArrow, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                <option value="Male" style={{ background: "#010b16" }}>Male</option>
                <option value="Female" style={{ background: "#010b16" }}>Female</option>
                <option value="Other" style={{ background: "#010b16" }}>Other</option>
              </select>
            </AuthField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <AuthField num="07" label="Height (cm)" compact>
              <div className="relative">
                <input type="number" name="height" placeholder="0" min={0}
                  value={formData.height || ""} onChange={handleChange} required className={fieldClass} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[rgba(0,180,255,0.3)]">CM</span>
              </div>
            </AuthField>
            <AuthField num="08" label="Weight (kg)" compact>
              <div className="relative">
                <input type="number" name="weight" placeholder="0" min={0}
                  value={formData.weight || ""} onChange={handleChange} required className={fieldClass} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[rgba(0,180,255,0.3)]">KG</span>
              </div>
            </AuthField>
          </div>

          <AuthChevrons />

          <button
            type="submit"
            disabled={loading || notifStage !== "idle"}
            className="group relative mt-1 w-full overflow-hidden border border-[rgba(0,200,255,0.5)] py-3 font-mono text-[0.65rem] uppercase tracking-[0.5em] text-[#7dd8ff] transition-all duration-300 hover:border-[rgba(0,220,255,0.8)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(180deg, rgba(0,100,200,0.15), rgba(0,60,140,0.1))" }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.12),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              <span className="text-[rgba(0,200,255,0.4)]">[</span>
              {loading ? "Registering Hunter..." : "Awaken & Register"}
              <span className="text-[rgba(0,200,255,0.4)]">]</span>
            </span>
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between border-t border-[rgba(0,120,180,0.15)] pt-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.1em] text-[rgba(0,140,180,0.4)]">Already a Hunter?</span>
            <Link to="/login"
              className="font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,220,0.7)] transition-all hover:text-[#00d4ff]">
              ⟨ Return to Gate ⟩
            </Link>
          </div>
          <span className="font-mono text-[8px] tracking-[0.2em] text-[rgba(0,140,200,0.25)]">
            GATE CLASS: E → S
          </span>
        </div>
      </AuthPanel>

      <AuthStyles />
    </div>
  );
};

export default SignupView;