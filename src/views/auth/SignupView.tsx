import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSignupViewModel } from "../../viewmodels/auth/SignupViewModel";

const fieldClass =
  "w-full border border-b-[rgba(0,180,255,0.4)] border-[rgba(0,140,220,0.2)] bg-[rgba(0,20,50,0.5)] px-3 py-2 font-sans text-sm text-[#d8f0ff] placeholder-[rgba(0,140,200,0.3)] outline-none transition-all focus:border-b-[#00d4ff] focus:bg-[rgba(0,30,70,0.6)] focus:border-[rgba(0,180,255,0.5)]";

const FieldWrapper = ({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-1 flex items-center gap-1.5">
      <span className="font-mono text-[8px] text-[rgba(0,180,255,0.3)]">{num}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#00b4ff]">{label}</span>
    </div>
    <div className="relative">
      <div className="pointer-events-none absolute -left-px -top-px h-1.5 w-1.5 border-l border-t border-[rgba(0,200,255,0.5)]" />
      <div className="pointer-events-none absolute -bottom-px -right-px h-1.5 w-1.5 border-b border-r border-[rgba(0,200,255,0.5)]" />
      {children}
    </div>
  </div>
);

const Divider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.25), transparent)" }} />
    <div className="h-1.5 w-1.5 rotate-45 border border-[rgba(0,200,255,0.5)]" style={{ boxShadow: "0 0 4px rgba(0,200,255,0.3)" }} />
    <span className="font-mono text-[8px] tracking-[0.3em] text-[rgba(0,180,255,0.4)]">{label}</span>
    <div className="h-1.5 w-1.5 rotate-45 border border-[rgba(0,200,255,0.5)]" style={{ boxShadow: "0 0 4px rgba(0,200,255,0.3)" }} />
    <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, rgba(0,180,255,0.25), transparent)" }} />
  </div>
);

const SignupView = () => {
  const { formData, loading, error, handleChange, handleSignup } =
    useSignupViewModel();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const [successStage, setSuccessStage] = useState<"idle" | "created" | "redirecting">("idle");
  const [createdVisible, setCreatedVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup();

    // 1. Show green "Account Created" notification
    setSuccessStage("created");
    setCreatedVisible(true);

    // 2. After 2s, fade it out
    setTimeout(() => setCreatedVisible(false), 2000);

    // 3. After 2.8s, show "Redirecting" notification and start countdown
    setTimeout(() => {
      setSuccessStage("redirecting");
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
    }, 2800);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number };
    type LineObj = { x1: number; y1: number; x2: number; y2: number; alpha: number; speed: number };

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const lines: LineObj[] = Array.from({ length: 12 }, () => ({
      x1: Math.random() * canvas.width,
      y1: Math.random() * canvas.height,
      x2: Math.random() * canvas.width,
      y2: Math.random() * canvas.height,
      alpha: Math.random() * 0.06 + 0.02,
      speed: Math.random() * 0.001 + 0.0005,
    }));

    let frame = 0;
    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#010b16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0,120,255,0.06)";
      ctx.lineWidth = 1;
      const gs = 40;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      frame++;
      lines.forEach((l) => {
        l.x1 += Math.sin(frame * l.speed) * 0.5;
        l.y1 += Math.cos(frame * l.speed) * 0.5;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.strokeStyle = `rgba(0,180,255,${l.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.03;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,255,${a})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#010b16] flex items-center justify-center px-8">

      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[580px]">

        {/* Outer frame rings */}
        <div className="pointer-events-none absolute -inset-3 border border-[rgba(0,160,255,0.12)]" />
        <div className="pointer-events-none absolute -inset-5 border border-[rgba(0,160,255,0.06)]" />

        {/* Corner brackets */}
        <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#00c8ff]"
          style={{ boxShadow: "-2px -2px 12px rgba(0,200,255,0.4), inset -2px -2px 8px rgba(0,200,255,0.1)" }} />
        <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#00c8ff]"
          style={{ boxShadow: "2px -2px 12px rgba(0,200,255,0.4), inset 2px -2px 8px rgba(0,200,255,0.1)" }} />
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#00c8ff]"
          style={{ boxShadow: "-2px 2px 12px rgba(0,200,255,0.4), inset -2px 2px 8px rgba(0,200,255,0.1)" }} />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#00c8ff]"
          style={{ boxShadow: "2px 2px 12px rgba(0,200,255,0.4), inset 2px 2px 8px rgba(0,200,255,0.1)" }} />

        {/* Panel glow border */}
        <div className="pointer-events-none absolute inset-0 border border-[rgba(0,180,255,0.18)]"
          style={{ boxShadow: "0 0 60px rgba(0,120,255,0.25), 0 0 120px rgba(0,80,255,0.1), inset 0 0 60px rgba(0,0,30,0.8)" }} />

        {/* Scanline */}
        <div className="pointer-events-none absolute inset-x-0 z-20 h-px animate-[scanline_4s_linear_infinite]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.08), transparent)" }} />

        {/* Panel inner */}
        <div className="relative overflow-hidden px-8 py-6"
          style={{ background: "linear-gradient(180deg, rgba(1,18,38,0.95) 0%, rgba(1,12,28,0.98) 100%)", backdropFilter: "blur(24px)" }}>

          {/* Success Notifications */}
          {(successStage === "created" || successStage === "redirecting") && (
            <div
              className="mb-4 border border-[rgba(0,255,150,0.4)] px-4 py-3"
              style={{
                background: "rgba(0,180,80,0.08)",
                opacity: createdVisible ? 1 : 0,
                transform: createdVisible ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: "none",
                // Keep in DOM so height doesn't collapse abruptly
                maxHeight: createdVisible ? "80px" : "0px",
                marginBottom: createdVisible ? undefined : "0",
                overflow: "hidden",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-[rgba(0,255,150,0.7)] font-mono text-sm text-[#00ff96]"
                  style={{ boxShadow: "0 0 10px rgba(0,255,150,0.3)" }}>
                  ✓
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff96]">Account Created</p>
                  <p className="font-mono text-[9px] tracking-[0.15em] text-[rgba(0,255,150,0.5)]">Hunter profile successfully registered</p>
                </div>
              </div>
            </div>
          )}

          {successStage === "redirecting" && (
            <>
              <div style={{ height: 0 }} />
              <div className="mb-4 border border-[rgba(0,180,255,0.35)] px-4 py-3 animate-[fadeIn_0.4s_ease-out]"
                style={{ background: "rgba(0,100,200,0.1)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 animate-pulse items-center justify-center rounded-full border-2 border-[rgba(0,180,255,0.7)] font-mono text-sm text-[#00c8ff]"
                    style={{ boxShadow: "0 0 10px rgba(0,180,255,0.3)" }}>
                    ⟳
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5ce8ff]">Redirecting to Gate</p>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.5)]">
                      Returning to login in{" "}
                      <span className="text-[#00c8ff]" style={{ textShadow: "0 0 8px rgba(0,200,255,0.6)" }}>
                        {countdown}s
                      </span>
                    </p>
                  </div>
                  {/* Countdown ring */}
                  <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0">
                    <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(0,120,200,0.2)" strokeWidth="2" />
                    <circle cx="16" cy="16" r="13" fill="none" stroke="#00c8ff" strokeWidth="2"
                      strokeDasharray={`${(countdown / 3) * 81.7} 81.7`}
                      strokeLinecap="round"
                      transform="rotate(-90 16 16)"
                      style={{ filter: "drop-shadow(0 0 4px rgba(0,200,255,0.6))", transition: "stroke-dasharray 0.9s linear" }}
                    />
                    <text x="16" y="20" textAnchor="middle" fill="#00c8ff" fontSize="10" fontFamily="monospace">{countdown}</text>
                  </svg>
                </div>
              </div>
            </>
          )}


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

          {/* Error */}
          {error && (
            <div className="mb-3 flex items-center gap-2 border border-[rgba(220,50,50,0.4)] px-3 py-2"
              style={{ background: "rgba(180,20,20,0.12)" }}>
              <span className="text-sm text-[#ff5555]">✕</span>
              <span className="font-mono text-[10px] text-[#ff6666]">[ ERROR ] {error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3">

            <Divider label="IDENTITY DATA" />

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <FieldWrapper num="01" label="First Name">
                <input type="text" name="firstName" placeholder="Sung"
                  value={formData.firstName} onChange={handleChange} required className={fieldClass} />
              </FieldWrapper>
              <FieldWrapper num="02" label="Last Name">
                <input type="text" name="lastName" placeholder="Jin-Woo"
                  value={formData.lastName} onChange={handleChange} required className={fieldClass} />
              </FieldWrapper>
            </div>

            {/* Email + Password row */}
            <div className="grid grid-cols-2 gap-3">
              <FieldWrapper num="03" label="Hunter ID (Email)">
                <input type="email" name="email" placeholder="hunter@caltrack.io"
                  value={formData.email} onChange={handleChange} required className={fieldClass} />
              </FieldWrapper>
              <FieldWrapper num="04" label="Access Key">
                <input type="password" name="password" placeholder="••••••••••••"
                  value={formData.password} onChange={handleChange} required className={fieldClass} />
              </FieldWrapper>
            </div>

            <Divider label="PHYSICAL STATS" />

            {/* Age + Gender row */}
            <div className="grid grid-cols-2 gap-3">
              <FieldWrapper num="05" label="Age">
                <input type="number" name="age" placeholder="0" min={0}
                  value={formData.age || ""} onChange={handleChange} required className={fieldClass} />
              </FieldWrapper>
              <FieldWrapper num="06" label="Gender">
                <select name="gender" value={formData.gender} onChange={handleChange} required
                  className={fieldClass + " cursor-pointer appearance-none"}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(0,180,255,0.5)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                  <option value="Male" style={{ background: "#010b16" }}>Male</option>
                  <option value="Female" style={{ background: "#010b16" }}>Female</option>
                  <option value="Other" style={{ background: "#010b16" }}>Other</option>
                </select>
              </FieldWrapper>
            </div>

            {/* Height + Weight row */}
            <div className="grid grid-cols-2 gap-3">
              <FieldWrapper num="07" label="Height (cm)">
                <div className="relative">
                  <input type="number" name="height" placeholder="0" min={0}
                    value={formData.height || ""} onChange={handleChange} required className={fieldClass} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[rgba(0,180,255,0.3)]">CM</span>
                </div>
              </FieldWrapper>
              <FieldWrapper num="08" label="Weight (kg)">
                <div className="relative">
                  <input type="number" name="weight" placeholder="0" min={0}
                    value={formData.weight || ""} onChange={handleChange} required className={fieldClass} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[rgba(0,180,255,0.3)]">KG</span>
                </div>
              </FieldWrapper>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
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

          {/* Footer */}
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

        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SignupView;