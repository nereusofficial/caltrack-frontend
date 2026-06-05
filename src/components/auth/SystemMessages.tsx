import SectionLabel from "./SectionLabel";

interface SystemMessage {
  icon: string;
  label: string;
  labelColor: string;
  borderColor: string;
  bg: string;
  textColor: string;
  text: string;
  highlight?: string;
}

const messages: SystemMessage[] = [
  {
    icon: "ti-robot",
    label: "AI Advisor",
    labelColor: "rgba(0,200,255,0.5)",
    borderColor: "rgba(0,200,255,0.15)",
    bg: "rgba(0,25,60,0.6)",
    textColor: "rgba(160,210,255,0.8)",
    text: "You're 18g short on protein today. Add Greek yogurt or cottage cheese before bed to hit your target.",
  },
  {
    icon: "ti-star",
    label: "Rank Tip",
    labelColor: "rgba(255,215,0,0.5)",
    borderColor: "rgba(255,215,0,0.12)",
    bg: "rgba(30,22,0,0.5)",
    textColor: "rgba(255,230,150,0.75)",
    text: "Complete Protein Warrior tomorrow to unlock D-Rank and new workout tiers.",
    highlight: "Protein Warrior",
  },
  {
    icon: "ti-alert-triangle",
    label: "Warning",
    labelColor: "rgba(255,90,90,0.5)",
    borderColor: "rgba(255,90,90,0.12)",
    bg: "rgba(40,5,5,0.4)",
    textColor: "rgba(255,180,180,0.75)",
    text: "Fiber intake is at 40% of goal. Add leafy greens or legumes to your next meal.",
  },
];

const renderText = (text: string, highlight?: string, textColor?: string) => {
  if (!highlight) return <span style={{ color: textColor }}>{text}</span>;
  const parts = text.split(highlight);
  return (
    <span style={{ color: textColor }}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{ color: "#ffd700" }}>{highlight}</span>
          )}
        </span>
      ))}
    </span>
  );
};

const SystemMessages = ({ stretch = false }: { stretch?: boolean }) => (
  <div className={stretch ? "flex flex-col h-full" : ""}>
    <SectionLabel label="System Messages" />
    <div className={`flex flex-col gap-3 ${stretch ? "flex-1 min-h-0" : ""}`}>
      {messages.map(({ icon, label, labelColor, borderColor, bg, textColor, text, highlight }) => (
        <div
          key={label}
          className={`relative flex gap-3 px-4 py-3 ${stretch ? "flex-1" : ""}`}
          style={{ border: `1px solid ${borderColor}`, background: bg }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg,transparent,${labelColor},transparent)`,
            }}
          />
          <div
            className="mt-[2px] flex h-7 w-7 flex-shrink-0 items-center justify-center border text-[14px]"
            style={{ borderColor: labelColor, color: labelColor }}
          >
            <i className={`ti ${icon}`} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="mb-[3px] font-mono text-[8px] uppercase tracking-[0.3em]"
              style={{ color: labelColor }}
            >
              {label}
            </div>
            <p className="text-[0.85rem] leading-relaxed">
              {renderText(text, highlight, textColor)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SystemMessages;