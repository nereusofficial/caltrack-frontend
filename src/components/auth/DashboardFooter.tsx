const DashboardFooter = () => (
  <footer className="flex h-[48px] flex-shrink-0 items-center justify-between border-t border-[rgba(0,180,255,0.08)] bg-[rgba(1,8,20,0.98)] px-5">
    <span className="font-mono text-[7px] tracking-[0.2em] text-[rgba(0,140,180,0.25)]">
      CAL-SYS · RANK: E-CLASS · GATE: OPEN · SESSION ACTIVE
    </span>
    <div className="flex gap-[3px]">
      {[true, false, false, false, false].map((on, i) => (
        <div
          key={i}
          className={`h-[4px] w-[4px] rounded-full ${on ? "bg-[#00c8ff] shadow-[0_0_4px_rgba(0,200,255,0.5)]" : "bg-[rgba(0,80,140,0.3)]"}`}
        />
      ))}
    </div>
  </footer>
);

export default DashboardFooter;