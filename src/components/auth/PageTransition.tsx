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

    setMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );

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
                backgroundSize: "40px 40px",
              }}
            />

            {/* Scan Line */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "120vh" }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute left-0 right-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00c8ff, white, #00c8ff, transparent)",
                boxShadow:
                  "0 0 25px rgba(0,200,255,.9)",
              }}
            />

            {/* Center Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className="
                  font-mono
                  text-xs
                  tracking-[0.6em]
                  text-cyan-400
                "
              >
                {message}
              </div>
            </motion.div>

            {/* Glitch Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0, 0.2, 0],
              }}
              transition={{
                duration: 0.5,
                delay: 0.4,
              }}
              className="absolute inset-0 bg-cyan-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;