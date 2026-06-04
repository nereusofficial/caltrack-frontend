interface SectionLabelProps {
  label: string;
}

const SectionLabel = ({ label }: SectionLabelProps) => (
  <div className="mb-[7px] flex items-center gap-2">
    <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-[rgba(0,160,200,0.4)]">
      {label}
    </span>
    <div className="h-px flex-1"
      style={{ background: "linear-gradient(90deg,rgba(0,180,255,0.15),transparent)" }} />
  </div>
);

export default SectionLabel;