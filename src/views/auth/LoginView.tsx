import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginViewModel } from "../../viewmodels/auth/LoginViewModel";

const LoginView = () => {
  const { formData, loading, error, handleChange, handleLogin } =
    useLoginViewModel();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const passStatusRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  const [notifStage, setNotifStage] =
  useState<"idle" | "auth" | "redirecting">("idle");

  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await handleLogin();
    if (!success) return;

    // STEP 1: show auth notif
    setNotifStage("auth");
    setVisible(true);

    // fade out auth notif
    setTimeout(() => {
      setVisible(false);

      // STEP 2: swap to redirecting AFTER fade out
      setTimeout(() => {
        setNotifStage("redirecting");
        setVisible(true);

        setCountdown(3);
        let current = 3;

        const interval = setInterval(() => {
          current--;

          if (current <= 0) {
            clearInterval(interval);
            navigate("/dashboard");
          } else {
            setCountdown(current);
          }
        }, 1000);
      }, 400); // match fade duration
    }, 2000);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (passStatusRef.current) {
      if (e.target.value.length > 0) {
        passStatusRef.current.textContent = "ENCRYPTED";
        passStatusRef.current.style.color = "rgba(0,220,255,0.5)";
      } else {
        passStatusRef.current.textContent = "LOCKED";
        passStatusRef.current.style.color = "rgba(0,180,255,0.25)";
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010b16] p-8">

      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[500px]">

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
        <div className="relative overflow-hidden px-10 py-9"
          style={{ background: "linear-gradient(180deg, rgba(1,18,38,0.95) 0%, rgba(1,12,28,0.98) 100%)", backdropFilter: "blur(24px)" }}>

          {/* Success Notifications */}
          {notifStage !== "idle" && (
            <div
              className="mb-4 border px-4 py-3"
              style={{
                background:
                  notifStage === "auth"
                    ? "rgba(0,180,80,0.08)"
                    : "rgba(0,100,200,0.1)",

                borderColor:
                  notifStage === "auth"
                    ? "rgba(0,255,150,0.4)"
                    : "rgba(0,180,255,0.35)",

                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {notifStage === "auth" ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[rgba(0,255,150,0.7)] text-[#00ff96]">
                    ✓
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff96]">
                      Authentication Successful
                    </p>
                    <p className="font-mono text-[9px] text-[rgba(0,255,150,0.5)]">
                      Identity verified — access granted
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 animate-pulse items-center justify-center rounded-full border-2 border-[rgba(0,180,255,0.7)] text-[#00c8ff]">
                    ⟳
                  </div>

                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5ce8ff]">
                      Entering the System
                    </p>
                    <p className="font-mono text-[9px] text-[rgba(0,180,255,0.5)]">
                      Loading dashboard in{" "}
                      <span className="text-[#00c8ff]">{countdown}s</span>
                    </p>
                  </div>

                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      fill="none"
                      stroke="rgba(0,120,200,0.2)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      fill="none"
                      stroke="#00c8ff"
                      strokeWidth="2"
                      strokeDasharray={`${(countdown / 3) * 81.7} 81.7`}
                      transform="rotate(-90 16 16)"
                    />
                    <text
                      x="16"
                      y="20"
                      textAnchor="middle"
                      fill="#00c8ff"
                      fontSize="10"
                    >
                      {countdown}
                    </text>
                  </svg>
                </div>
              )}
            </div>
          )}

          {/* Top tick marks */}
          <div className="mb-4 flex items-center justify-center gap-1">
            <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
            <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
            <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
            <span className="px-2 font-mono text-[9px] tracking-[0.3em] text-[rgba(0,200,255,0.4)]">SYS-AUTH</span>
            <div className="h-[14px] w-px bg-[rgba(0,200,255,0.5)]" />
            <div className="h-[8px] w-px bg-[rgba(0,200,255,0.5)]" />
            <div className="h-[6px] w-px bg-[rgba(0,200,255,0.5)]" />
          </div>

          {/* Title */}
          <div className="mb-2 text-center font-mono text-[9px] tracking-[0.35em] text-[rgba(0,180,255,0.35)]">
            SYSTEM ID: CAL-9821-X // DUNGEON MANAGEMENT
          </div>
          <h1 className="mb-1 text-center text-5xl font-light uppercase tracking-[0.18em] text-[#c8eeff]"
            style={{ textShadow: "0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,120,255,0.3)" }}>
            Cal<span className="font-semibold text-[#00d4ff]">Track</span>
          </h1>
          <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[rgba(0,160,220,0.45)]">
            Authentication Protocol Active
          </p>

          {/* Rank pips */}
          <div className="mb-5 flex justify-center gap-2">
            {[true, true, true, false, false].map((active, i) => (
              <div key={i} className={`h-1 w-8 ${active ? "bg-[rgba(0,200,255,0.6)]" : "bg-[rgba(0,100,160,0.3)]"}`}
                style={active ? { boxShadow: "0 0 6px rgba(0,200,255,0.5)" } : {}} />
            ))}
          </div>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-2">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.25), transparent)" }} />
            <div className="h-2 w-2 rotate-45 border border-[rgba(0,200,255,0.5)]" style={{ boxShadow: "0 0 6px rgba(0,200,255,0.3)" }} />
            <span className="font-mono text-[9px] tracking-[0.3em] text-[rgba(0,180,255,0.4)]">CREDENTIALS REQUIRED</span>
            <div className="h-2 w-2 rotate-45 border border-[rgba(0,200,255,0.5)]" style={{ boxShadow: "0 0 6px rgba(0,200,255,0.3)" }} />
            <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, rgba(0,180,255,0.25), transparent)" }} />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 border border-[rgba(220,50,50,0.4)] px-4 py-3"
              style={{ background: "rgba(180,20,20,0.12)" }}>
              <span className="text-sm text-[#ff5555]">✕</span>
              <span className="font-mono text-[11px] text-[#ff6666]">[ ACCESS DENIED ] {error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-7">

            {/* Email field */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-[9px] text-[rgba(0,180,255,0.3)]">01</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00b4ff]">Hunter ID</span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-[rgba(0,200,255,0.5)]" />
                <div className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[rgba(0,200,255,0.5)]" />
                <input
                  type="email"
                  name="email"
                  placeholder="hunter@caltrack.io"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-b-[rgba(0,180,255,0.4)] border-[rgba(0,140,220,0.2)] bg-[rgba(0,20,50,0.5)] px-4 py-3 font-sans text-base text-[#d8f0ff] placeholder-[rgba(0,140,200,0.3)] outline-none transition-all focus:border-b-[#00d4ff] focus:bg-[rgba(0,30,70,0.6)] focus:border-[rgba(0,180,255,0.5)]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
                  EMAIL
                </span>
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-[9px] text-[rgba(0,180,255,0.3)]">02</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00b4ff]">Access Key</span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-[rgba(0,200,255,0.5)]" />
                <div className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[rgba(0,200,255,0.5)]" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border border-b-[rgba(0,180,255,0.4)] border-[rgba(0,140,220,0.2)] bg-[rgba(0,20,50,0.5)] px-4 py-3 font-sans text-base text-[#d8f0ff] placeholder-[rgba(0,140,200,0.3)] outline-none transition-all focus:border-b-[#00d4ff] focus:bg-[rgba(0,30,70,0.6)] focus:border-[rgba(0,180,255,0.5)]"
                />
                <span ref={passStatusRef} className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.15em] text-[rgba(0,180,255,0.25)]">
                  LOCKED
                </span>
              </div>
            </div>

            {/* Chevrons */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.2))" }} />
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-2">
                  {[0,1,2].map(i => (
                    <div key={i} className="h-[6px] w-[10px] rotate-45 border-b-2 border-r-2 border-[rgba(0,200,255,0.5)]" />
                  ))}
                </div>
                <div className="flex gap-2">
                  {[0,1,2].map(i => (
                    <div key={i} className="h-[6px] w-[10px] rotate-45 border-b-2 border-r-2 border-[rgba(0,200,255,0.2)]" />
                  ))}
                </div>
              </div>
              <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, rgba(0,180,255,0.2))" }} />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || notifStage !== "idle"}
              className="group relative w-full overflow-hidden border border-[rgba(0,200,255,0.5)] py-4 font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#7dd8ff] transition-all duration-300 hover:border-[rgba(0,220,255,0.8)] hover:text-[#c8f4ff] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: "linear-gradient(180deg, rgba(0,100,200,0.15), rgba(0,60,140,0.1))" }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,200,255,0.12),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-[rgba(0,200,255,0.4)]">[</span>
                {loading ? "Authenticating..." : "Enter System"}
                <span className="text-[rgba(0,200,255,0.4)]">]</span>
              </span>
            </button>
          </form>

          {/* Links */}
          <div className="mt-5 flex justify-between">
            <Link to="/forgot-password"
              className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] text-[rgba(0,140,180,0.5)] transition-all hover:text-[#5ce8ff]"
              style={{ textShadow: "none" }}
              onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 8px rgba(0,200,255,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.textShadow = "none")}>
              <span>⟨</span><span>Recover Access</span>
            </Link>
            <Link to="/signup"
              className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] text-[rgba(0,180,220,0.7)] transition-all hover:text-[#00d4ff]">
              <span>Register Hunter</span><span>⟩</span>
            </Link>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex items-center justify-between border-t border-[rgba(0,120,180,0.15)] pt-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[rgba(0,140,200,0.25)]">
              CAL-SYS // GATE CLASS: A
            </span>
            <div className="flex gap-1">
              {[true, true, true, false, false].map((active, i) => (
                <div key={i} className={`h-[5px] w-[5px] rounded-full ${active ? "bg-[#00c8ff]" : "bg-[rgba(0,180,255,0.15)]"}`}
                  style={active ? { boxShadow: "0 0 5px rgba(0,200,255,0.6)" } : {}} />
              ))}
            </div>
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

export default LoginView;