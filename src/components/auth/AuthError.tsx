import { useEffect, useState } from "react";

interface AuthErrorProps {
  error: string;
}

const AuthError = ({ error }: AuthErrorProps) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (error) {
      setMounted(true);
      // Small delay so the mount triggers the CSS transition
      const fadeIn = setTimeout(() => setVisible(true), 10);
      const fadeOut = setTimeout(() => setVisible(false), 3000);
      // Unmount after fade-out transition completes (400ms)
      const unmount = setTimeout(() => setMounted(false), 3400);
      return () => {
        clearTimeout(fadeIn);
        clearTimeout(fadeOut);
        clearTimeout(unmount);
      };
    }
  }, [error]);

  if (!mounted) return null;

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
        className="mb-4 border border-[rgba(220,50,50,0.4)] px-4 py-3"
        style={{ background: "rgba(180,20,20,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-[rgba(220,50,50,0.6)] text-sm text-[#ff5555]"
            style={{ boxShadow: "0 0 10px rgba(220,50,50,0.2)" }}>
            ✕
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#ff5555]">
              Access Denied
            </p>
            <p className="font-mono text-[9px] text-[rgba(255,100,100,0.7)]">
              {error}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthError;