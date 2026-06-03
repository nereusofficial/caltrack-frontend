const AuthStyles = () => (
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
);

export const inputClass =
  "w-full border border-b-[rgba(0,180,255,0.4)] border-[rgba(0,140,220,0.2)] bg-[rgba(0,20,50,0.5)] px-4 py-3 font-sans text-base text-[#d8f0ff] placeholder-[rgba(0,140,200,0.3)] outline-none transition-all focus:border-b-[#00d4ff] focus:bg-[rgba(0,30,70,0.6)] focus:border-[rgba(0,180,255,0.5)]";

export default AuthStyles;