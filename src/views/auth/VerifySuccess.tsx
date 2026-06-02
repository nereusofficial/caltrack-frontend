import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifySuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let current = 3;

    const interval = setInterval(() => {
      current--;
      setCountdown(current);

      if (current <= 0) {
        clearInterval(interval);

        try {
          window.close();
        } catch {
          navigate("/login");
        }

        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#010b16]">
      <div className="w-full max-w-md border border-[rgba(0,255,150,0.3)] bg-[rgba(0,40,20,0.4)] p-8">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#00ff96] text-2xl text-[#00ff96]">
            ✓
          </div>
        </div>

        <h1 className="text-center font-mono text-lg uppercase tracking-[0.3em] text-[#00ff96]">
          Account Verified!
        </h1>

        <p className="mt-3 text-center font-mono text-sm text-[rgba(0,255,150,0.7)]">
          Your account has been successfully activated.
        </p>

        <p className="mt-6 text-center font-mono text-xs tracking-[0.2em] text-[rgba(0,255,150,0.5)]">
          Page closing in {countdown}...
        </p>
      </div>
    </div>
  );
};

export default VerifySuccess;