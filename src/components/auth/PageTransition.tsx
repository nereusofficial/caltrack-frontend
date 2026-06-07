import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const messages = [
  "INITIALIZING...",
  "VERIFYING ACCESS...",
  "LOADING INTERFACE...",
  "ACCESS GRANTED",
];

const PageTransition = ({ children }: Props) => {
  const location = useLocation();

  const [displayChildren, setDisplayChildren] = useState(children);
  const [showOverlay, setShowOverlay] = useState(false);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    setShowOverlay(true);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);

    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
    }, 450);

    const finishTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 1000);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(finishTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {displayChildren}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden bg-[#020814]"
          >
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,200,255,.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,200,255,.08) 1px, transparent 1px)
                `,
                backgroundSize: "clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px)",
              }}
            />

            {/* Scan Line */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "120vh" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] sm:h-[3px]"
              style={{
                background: "linear-gradient(90deg, transparent, #00c8ff, white, #00c8ff, transparent)",
                boxShadow: "0 0 25px rgba(0,200,255,.9)",
              }}
            />

            {/* Center Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 flex flex-col items-center gap-3"
            >
              {/* Main message */}
              <div
                className="font-mono text-center text-[clamp(0.55rem,2.5vw,0.75rem)] tracking-[clamp(0.2em,1.5vw,0.6em)] text-cyan-400 whitespace-nowrap"
              >
                {message}
              </div>

              {/* Progress bar */}
              <div className="w-[clamp(80px,30vw,200px)] h-[1px] bg-[rgba(0,200,255,0.15)] overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="h-full bg-cyan-400"
                  style={{ boxShadow: "0 0 8px rgba(0,200,255,0.8)" }}
                />
              </div>

              {/* Sub label */}
              <div className="font-mono text-[clamp(0.45rem,1.5vw,0.6rem)] tracking-[clamp(0.15em,1vw,0.4em)] text-[rgba(0,200,255,0.3)]">
                CAL-SYS · SECURE CONNECTION
              </div>
            </motion.div>

            {/* Corner decorations — scale with viewport */}
            {[
              "top-[clamp(8px,2vw,16px)] left-[clamp(8px,2vw,16px)] border-l-2 border-t-2",
              "top-[clamp(8px,2vw,16px)] right-[clamp(8px,2vw,16px)] border-r-2 border-t-2",
              "bottom-[clamp(8px,2vw,16px)] left-[clamp(8px,2vw,16px)] border-l-2 border-b-2",
              "bottom-[clamp(8px,2vw,16px)] right-[clamp(8px,2vw,16px)] border-r-2 border-b-2",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute ${cls} border-cyan-500/40 w-[clamp(12px,3vw,24px)] h-[clamp(12px,3vw,24px)]`}
              />
            ))}

            {/* Glitch Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute inset-0 bg-cyan-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;